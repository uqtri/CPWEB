import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import { generateSlug } from "../libs/slug.js";
import { parseJwt } from "../utils/parseJwt.js";
import problemService from "../services/problems.js";
import userSolvedProblem from "../services/userSolvedProblem.js";

const createProblem = async (req, res) => {
  let problemData = req.body;

  const payload = parseJwt(req.cookies.jwt);

  if (!problemData.userId) {
    problemData.userId = payload.id;
  }
  if (!problemData.slug) problemData.slug = generateSlug(problemData.title);
  try {
    const problem = await prisma.problem.create({
      data: {
        ...problemData,
        categories: {
          connect: problemData.categories.map((category) => ({
            name: category.name,
          })),
        },
      },
    });
    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: problem,
    });
  } catch (err) {
    console.log("Error creating problem:", err);
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!problem) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        message: "Problem not found",
        success: false,
      });
    }

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: problem,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const getProblemBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const problem = await prisma.problem.findUnique({
      where: { slug },
      include: {
        categories: true,
      },
    });

    if (!problem) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        message: "Problem not found",
        success: false,
      });
    }

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: problem,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const getProblems = async (req, res) => {
  const { hideSolved, userId, title, difficulty, categories, pointRange } =
    req.query;
  // const skip = (page - 1) * limit;
  console.log(categories, "@@@");
  let { limit, page, skip, take } = req.query;
  if (page === undefined) {
    skip = undefined;
    take = undefined;
  } else {
    page = parseInt(page) || 1;
    take = parseInt(limit) || 10;
    skip = parseInt(page - 1) * limit || 0;
  }
  const whereConditions = {
    isDeleted: false,
    categories: {
      some: {
        name: { in: categories ? categories : undefined },
      },
    },
    title: {
      contains: title ? title : undefined,
      mode: "insensitive",
    },
    difficulty: {
      equals: difficulty ? difficulty : undefined,
    },
    points: {
      gte: pointRange ? parseInt(pointRange.split(",")[0]) : undefined,
      lte: pointRange ? parseInt(pointRange.split(",")[1]) : undefined,
    },
  };

  if (hideSolved && hideSolved === "1" && userId) {
    console.log("Hide solved problems for userId:", hideSolved, userId);

    whereConditions.SolvedBy = {
      none: {
        userId: parseInt(userId),
      },
    };
  }
  try {
    const totalProblems = await prisma.problem.count({
      where: whereConditions,
    });
    const problems = await prisma.problem.findMany({
      include: {
        categories: true,
      },
      where: whereConditions,
      skip,
      take,
    });

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: { problems, totalProblems },
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      status: HTTP_STATUS.BAD_REQUEST.message,
      message: err.toString(),
    });
  }
};
const updateProblem = async (req, res) => {
  const { id } = req.params;

  let problemData = req.body;

  const payload = parseJwt(req.cookies.jwt);

  if (!problemData.userId) {
    problemData.userId = payload.id;
  }
  if (!problemData.slug) problemData.slug = generateSlug(problemData.title);

  try {
    const problem = await prisma.problem.update({
      where: { id: parseInt(id) },
      data: {
        ...problemData,
        categories: {
          connect: problemData.categories.map((category) => ({
            name: category.name,
          })),
        },
      },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: problem,
    });
  } catch (err) {
    console.log("Error updating problem:", err.toString());
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
export const deleteProblemByProblemId = async (req, res) => {
  const { problemId } = req.params;
  try {
    await problemService.deleteProblemByProblemId(problemId);
    await userSolvedProblem.deleteUserSolvedProblemByProblemId(problemId);
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

export default {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  getProblemBySlug,
};
