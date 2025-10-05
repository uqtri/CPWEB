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
  const MAX_TEST_CASES = 99;

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
    const testCaseDir = await readdirAsync(savedFilePath + `/${problem.slug}`, {
      withFileTypes: true,
    });
    if (testCaseDir.length > 2) {
      await rmdirAsync(savedFilePath + `/${problem.slug}`, {
        recursive: true,
        force: true,
      });
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        success: false,
        message: "Only two folders named input and output are allowed",
      });
    }
    const inputDir = testCaseDir.find((dir) => dir.name === "input");
    const outputDir = testCaseDir.find((dir) => dir.name === "output");
    if (!inputDir || !outputDir) {
      await rmdirAsync(savedFilePath + `/${problem.slug}`, {
        recursive: true,
        force: true,
      });
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        success: false,
        message: "Both input and output folders are required",
      });
    }
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
      savedFilePath +
        `/${problem.slug}/${file.originalname.replace(/\.zip$/, "")}`,
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
  const inputFolder = path.join(testCasePath, "input");
  const outputFolder = path.join(testCasePath, "output");
  const input = await readdirAsync(inputFolder, {
    withFileTypes: true,
  });
  const output = await readdirAsync(outputFolder, {
    withFileTypes: true,
  });
  const mergedInputOutput = [];

  for (let i = 0; i < input.length; i++) {
    mergedInputOutput.push({
      input: input[i].name,
      output:
        output.find((o) => o.name === input[i].name.replace(/^input/, "output"))
          ?.name || null,
    });
  }
  for (let i = 0; i < output.length; i++) {
    if (!mergedInputOutput.find((m) => m?.output === output[i].name)) {
      mergedInputOutput.push({
        input:
          input.find(
            (inp) => inp.name === output[i].name.replace(/^output/, "input")
          )?.name || null,
        output: output[i].name,
      });
    }
  }
  try {
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: {
        testCases: testCases,
        directories: mergedInputOutput,
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
  try {
    let { index } = req.params;
    const { problemSlug } = req.params;

    const testCases = await testCaseService.getTestCaseByProblemSlug(
      problemSlug
    );
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

    const inputFolder = path.join(testCasePath, "input");
    const outputFolder = path.join(testCasePath, "output");

    const inputDir = await readdirAsync(inputFolder, {
      withFileTypes: true,
    });

    const inputFilePath = path.join(inputFolder, `${inputDir[index].name}`);
    const outputFilePath = path.join(
      outputFolder,
      `${inputDir[index].name.replace("input", "output")}`
    );
    // const testCasesDir = await readdirAsync(inputFolder, {
    //   withFileTypes: true,
    // });

    const archive = archiver("zip", {
      zlib: { level: 2 },
    });
    // archive.directory(path.join(testCasePath, testCasesDir[index].name), false);

    archive.on("error", (err) => {
      console.error("Error creating archive:", err);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
        success: false,
        message: "Error creating archive",
      });
    });
    archive.file(inputFilePath, { name: `input.txt` });
    archive.file(outputFilePath, { name: `output.txt` });
    res.setHeader("Content-Type", "application/zip");
    archive.pipe(res);
    archive.finalize();
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
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
