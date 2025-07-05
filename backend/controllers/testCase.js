import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import path from "path";
import { rootPath } from "../utils/path.js";
import fs from "fs";
import { promisify } from "util";
import { shellCommand } from "../utils/shell.js";
const savedFilePath = path.join(rootPath, "..", "/test-cases");

const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);
const rmdirAsync = promisify(fs.rm);
const rmFileAsync = promisify(fs.unlink);

const createTestCase = async (req, res) => {
  const data = req.body;
  const { problemId } = req.params;
  const file = req.file;

  console.log("Received file:@@", file);
  if (!file) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "File is required",
    });
  }
  console.log("File received:", file);
  if (!file.originalname) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "File name is required",
    });
  }
  if (!problemId) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Problem ID is required",
    });
  }
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: parseInt(problemId) },
    });
    if (!problem) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        success: false,
        message: "Problem not found",
      });
    }
    console.log(savedFilePath + `/${problem.slug}`);
    await rmdirAsync(savedFilePath + `/${problem.slug}`, {
      recursive: true,
    });
    await mkdirAsync(savedFilePath + `/${problem.slug}`, {
      recursive: true,
    });
    await mkdirAsync(savedFilePath + `/${problem.slug}`, { recursive: true });
    await writeFileAsync(
      savedFilePath + `/${problem.slug}/${file.originalname}`,
      file.buffer
    );

    await shellCommand(
      `unzip -o ${savedFilePath}/${problem.slug}/${file.originalname} -d ${savedFilePath}/${problem.slug}`
    );
    await rmFileAsync(savedFilePath + `/${problem.slug}/${file.originalname}`);

    if (!problem) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        success: false,
        message: "Problem not found",
      });
    }

    const existingTestCase = await prisma.testCase.findFirst({
      where: {
        problemId: parseInt(problemId),
      },
    });
    let testCase;

    if (existingTestCase) {
      testCase = await prisma.testCase.update({
        where: { id: existingTestCase.id },
        data: {
          path: file.originalname,
        },
      });
    } else {
      testCase = await prisma.testCase.create({
        data: {
          problemId: parseInt(problemId),
          path: file.originalname,
        },
      });
    }
    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: testCase,
    });
  } catch (err) {
    console.error("Error in createTestCase:", err.toString());
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
