import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import { slug } from "../libs/slug.js";
import { parseJwt } from "../utils/parseJwt.js";
import problemService from "../services/problems.js";
import userSolvedProblem from "../services/userSolvedProblem.js";

const createProblem = async (req, res) => {
  let problemData = req.body;

  const payload = parseJwt(req.cookies.jwt);

  if (!problemData.userId) {
    problemData.userId = payload.id;
  }
  problemData.slug = slug(problemData.title);
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
  try {
    const problems = await prisma.problem.findMany({
      include: {
        categories: true,
      },
    });

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: problems,
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
  problemData.slug = slug(problemData.title);
  console.log(problemData);
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
