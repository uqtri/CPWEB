import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import path from "path";
import { rootPath } from "../utils/path.js";
import testCaseService from "../services/testCases.js";
import archiver from "archiver";

import {
  mkdirAsync,
  writeFileAsync,
  rmFileAsync,
  rmdirAsync,
  readdirAsync,
} from "../utils/fs.js";
import { shellCommand } from "../utils/shell.js";
const savedFilePath = path.join(rootPath, "..", "/test-cases");

const createTestCase = async (req, res) => {
  const data = req.body;
  const { problemId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "File is required",
    });
  }
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
    await rmdirAsync(savedFilePath + `/${problem.slug}`, {
      recursive: true,
      force: true,
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
    // await rmFileAsync(savedFilePath + `/${problem.slug}/${file.originalname}`);
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

    const testCases = await readdirAsync(
      savedFilePath + `/${problem.slug}/${problem.slug}`,
      {
        withFileTypes: true,
      }
    );

    if (existingTestCase) {
      testCase = await prisma.testCase.update({
        where: { id: existingTestCase.id },
        data: {
          path: file.originalname,
          quantity: testCases.length,
        },
      });
    } else {
      testCase = await prisma.testCase.create({
        data: {
          problemId: parseInt(problemId),
          path: file.originalname,
          quantity: testCases.length,
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
const getTestCaseByProblemSlug = async (req, res) => {
  const { problemSlug } = req.params;

  const testCases = await testCaseService.getTestCaseByProblemSlug(problemSlug);
  const testCasesPath = path.join(savedFilePath, testCases.problem.slug);

  console.log("Test cases path:", testCasesPath);
  if (!testCases) {
    return res.status(HTTP_STATUS.NOT_FOUND.code).json({
      success: false,
      message: "Test cases not found for this problem",
    });
  }

  const testCasePath = path.join(
    savedFilePath,
    testCases.problem.slug,
    testCases.path.replace(/\.zip$/, "")
  );
  const testCasesDir = await readdirAsync(testCasePath, {
    withFileTypes: true,
  });
  try {
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: {
        testCases: testCases,
        directories: testCasesDir,
      },
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

const downloadTestCaseByIndex = async (req, res) => {
  const { index } = req.params;
  const { problemSlug } = req.params;
  const testCases = await testCaseService.getTestCaseByProblemSlug(problemSlug);
  if (!testCases) {
    return res.status(HTTP_STATUS.NOT_FOUND.code).json({
      success: false,
      message: "Test cases not found for this problem",
    });
  }
  const testCasePath = path.join(
    savedFilePath,
    testCases.problem.slug,
    testCases.path.replace(/\.zip$/, "")
  );
  const testCasesDir = await readdirAsync(testCasePath, {
    withFileTypes: true,
  });

  const archive = archiver("zip", {
    zlib: { level: 2 },
  });
  archive.directory(path.join(testCasePath, testCasesDir[index].name), false);

  archive.on("error", (err) => {
    console.error("Error creating archive:", err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: "Error creating archive",
    });
  });
  res.setHeader("Content-Type", "application/zip");
  archive.pipe(res);
  archive.finalize();
};
const downloadZipTestCase = async (req, res) => {
  const { problemSlug } = req.params;
  const testCases = await testCaseService.getTestCaseByProblemSlug(problemSlug);

  if (!testCases) {
    return res.status(HTTP_STATUS.NOT_FOUND.code).json({
      success: false,
      message: "Test cases not found for this problem",
    });
  }
  const testCasePath = path.join(
    savedFilePath,
    testCases.problem.slug,
    testCases.path
  );
  try {
    return res.download(testCasePath, testCases.path, (err) => {
      if (err) console.error("Error downloading file:", err);
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
  getTestCaseByProblemSlug,
  updateTestCase,
  downloadZipTestCase,
  downloadTestCaseByIndex,
};
