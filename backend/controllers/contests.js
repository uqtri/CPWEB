import { prisma } from "../prisma/prisma-client.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { generateSlug } from "../libs/slug.js";
export const getContests = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const contests = await prisma.contest.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit),
      orderBy: { startTime: "desc" },
      include: {
        participants: true,
        problems: true,
      },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: contests,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
export const getContestBySlug = async (req, res) => {
  const { contestSlug } = req.params;

  console.log("Fetching contest with slug:", contestSlug);
  try {
    const contest = await prisma.contest.findUnique({
      where: { slug: contestSlug },
      include: {
        problems: {
          orderBy: [{ problem: { points: "asc" } }, { problem: { id: "asc" } }],
          include: {
            problem: {
              include: {
                categories: true,
              },
            },
          },
        },
        participants: true,
      },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: contest,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const createContest = async (req, res) => {
  let { title, startTime, endTime, problems, description, slug } = req.body;

  if (!slug) {
    slug = generateSlug(title);
  }

  try {
    const contest = await prisma.contest.create({
      data: {
        title,
        startTime,
        endTime,
        description,
        slug,
        problems: {
          connect: problems.map((problemId) => ({
            id: parseInt(problemId),
          })),
        },
      },
    });

    if (problems && problems.length > 0) {
      const contestProblems = problems.map((problemId) => ({
        contestId: contest.id,
        problemId: parseInt(problemId),
      }));

      await prisma.contestProblem.createMany({
        data: contestProblems,
      });
    }

    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: contest,
    });
  } catch (error) {
    console.log(error);
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
const updateContest = async (req, res) => {
  const { contestId } = req.params;
  let { title, startTime, endTime, description, problems, slug } = req.body;

  if (!slug) {
    slug = generateSlug(title);
  }
  try {
    await prisma.contestProblem.deleteMany({
      where: { contestId: parseInt(contestId) },
    });
    const updatedContest = await prisma.contest.update({
      where: { id: parseInt(contestId) },
      data: {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        description,
        slug,

        problems: {
          create: [
            ...problems.map((problemId) => ({
              problemId: parseInt(problemId),
            })),
          ],
        },
      },
    });
    // if (problems && problems.length > 0) {
    //   const contestProblems = problems.map((problemId) => ({
    //     contestId: updatedContest.id,
    //     problemId: parseInt(problemId),
    //   }));

    //   await prisma.contestProblem.createMany({
    //     data: contestProblems,
    //   });
    // }
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: updatedContest,
    });
  } catch (error) {
    console.log(error);
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};

const getLeaderboardByContestSlug = async (req, res) => {
  const { contestSlug } = req.params;
  try {
    const contest = await prisma.$queryRaw`
  SELECT "userId", jsonb_build_object('username', "username") as user, CAST(SUM(subquery.points) as INTEGER) as "totalPoints", array_agg(jsonb_build_object('problemId', "problemId", 'points', subquery.points, 'maxPoints', "problemPoints")) as "pointsPerProblem" 
    FROM (
		SELECT 
			register."userId",
			sb."problemId",
			max(sb."points") as points,
			max(prob.points) as "problemPoints"
		FROM "ContestRegistration" register
		JOIN 
			"Contest" ct
			ON register."contestId" = ct.id 
			AND ct.slug = ${contestSlug}
		LEFT JOIN
			"Submission" sb
			ON sb."userId" = register."userId" 
			AND sb."contestId" = ct.id
      AND sb."createdAt" >= ct."startTime"
		  AND sb."createdAt" <= ct."endTime"
		LEFT JOIN
			"Problem" prob 
			on prob.id = sb."problemId"
    GROUP BY 
			register."userId", sb."problemId"
		ORDER BY 
			"problemPoints" ASC, sb."problemId" ASC	

	) as subquery
      LEFT JOIN "User" on "User".id = "userId"
      GROUP BY "userId", "User".username
      ORDER BY "totalPoints" DESC NULLS LAST
`;

    if (!contest) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        success: false,
        message: "Contest not found",
      });
    }
    console.log(contest);
    // Process leaderboard data here if needed

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: contest,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};

export default {
  getContests,
  getContestBySlug,
  createContest,
  updateContest,
  getLeaderboardByContestSlug,
};
