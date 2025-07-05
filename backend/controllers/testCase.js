import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import path from "path";

const createTestCase = async (req, res) => {
  const data = req.body;
  const { problemId } = req.params;
  const file = req.file;

  try {
    const testCase = await prisma.testCase.create({
      data: {
        ...data,
        problemId: parseInt(problemId),
      },
    });
    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: testCase,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const deleteTestCase = async (req, res) => {
  const { id } = req.params;
  try {
    const testCase = await prisma.testCase.delete({
      where: { id: parseInt(id) },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: testCase,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const getTestCaseByProblemId = async (req, res) => {
  const { problemId } = req.params;
  try {
    const testCases = await prisma.testCase.findMany({
      where: { problemId: parseInt(problemId) },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: testCases,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

const updateTestCase = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const testCase = await prisma.testCase.update({
      where: { id: parseInt(id) },
      data,
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: testCase,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

export default {
  createTestCase,
  deleteTestCase,
  getTestCaseByProblemId,
  updateTestCase,
};
