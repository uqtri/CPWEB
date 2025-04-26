import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";

const createProblem = async (req, res) => {
  const problemData = req.body;

  try {
    const problem = await prisma.problem.create({
      data: problemData,
    });
    return res.status(HTTP_STATUS.CREATED.code).json({
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
const getProblems = async (req, res) => {
  try {
    const problems = await prisma.problem.findMany({});

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
  const data = req.body;
  const { id } = req.params;
  try {
    const problem = await prisma.problem.update({
      where: { id: parseInt(id) },
      data,
    });
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
export default { createProblem, getProblems, getProblemById, updateProblem };
