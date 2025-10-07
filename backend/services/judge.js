import submissionService from "./submisison.js";
import problemService from "./problems.js";
import submissionResultsService from "./submissionResults.js";
import userSolvedProblemService from "./userSolvedProblem.js";
import testCaseService from "./testCases.js";
import fs from "fs";
import { promisify } from "util";
import { rootPath } from "../utils/path.js";
import path from "path";
import { shellCommand } from "../utils/shell.js";
import { emitTestResults } from "../socket/emitters/submission.js";
const savedTestCasesPath = path.join(rootPath, "..", "test-cases"); // Path to save all test cases of problems
const savedSubmissionsPath = path.join(rootPath, "..", "submissions"); // Path to save all submissions
const readDirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);
const writeFileAsync = promisify(fs.writeFile);
const rmdirAsync = promisify(fs.rm);

export const judgeSubmission = async (submissionId) => {
  console.log("TEST CASE RECORD");
  const submisisonPath = path.join(
    savedSubmissionsPath,
    "submission-" + submissionId.toString()
  );
  let problem;
  let submission;
  let testCasesRecord;
  try {
    submission = await submissionService.getSubmissionById(submissionId);
    problem = await problemService.getProblemById(submission.problemId);
    testCasesRecord = await testCaseService.getTestCaseByProblemSlug(
      problem.slug
    );
    await mkdirAsync(submisisonPath, { recursive: true });
    await writeFileAsync(
      path.join(submisisonPath, "main.cpp"),
      submission.code
    );
  } catch (error) {
    await rmdirAsync(submisisonPath, { recursive: true, force: true });
    throw error;
  }
  const testCasesPath = path.join(
    savedTestCasesPath,
    problem.slug,
    testCasesRecord.path.replace(".zip", "")
  ); // path to save test cases of the problem
  const inputFolder = path.join(testCasesPath, "input");
  const outputFolder = path.join(testCasesPath, "output");
  const testCases = await readDirAsync(inputFolder);

  // compile the code
  const sourceFile = path.join(submisisonPath, "main.cpp");
  const binaryFile = path.join(submisisonPath, "main");

  const compileCommand = `ulimit -v ${
    problem.memoryLimit * 1024
  } && g++ "${sourceFile}" -o "${binaryFile}"`;

  try {
    await shellCommand(compileCommand);
  } catch (error) {
    await submissionService.updateSubmission(submissionId, {
      status: "Compilation Error",
    });
    emitTestResults("submission-" + submission.id.toString(), {
      index: 0,
      result: "Compilation Error",
      submissionId: submission.id,
    });

    await shellCommand(`rm -rf ${submisisonPath}`);
    throw error;
  }
  let index = 0;
  let accepted = true;
  let status = "Accepted";
  let testCasePassed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];

    const inputFile = path.join(inputFolder, testCase);
    const outputFile = path.join(
      outputFolder,
      testCase.replace("input", "output")
    );
    const commandRun = `ulimit -v ${problem.memoryLimit * 1000} && timeout ${
      problem.executionTime
    }s ${binaryFile} < ${inputFile} > output.out && diff ${outputFile} output.out`;

    try {
      await shellCommand(commandRun);
      const data = {
        index: index + 1,
        result: "Accepted",
        submissionId: submission.id,
      };
      testCasePassed++;
      emitTestResults("submission-" + submission.id.toString(), {
        ...data,
        done: i === testCases.length - 1,
      });
      console.log(data, "DATA");
      await submissionResultsService.createSubmissionResult(data);
    } catch (error) {
      accepted = false;
      let data = {
        index: index + 1,
        submissionId: submission.id,
        // code: error.code,
      };

      if (error.code === 124 || error.code === 137 || error.code === 143) {
        data.result = "Time Limit Exceeded"; // Time Limit Exceeded
        status = "Time Limit Exceeded";
      } else if (
        error.code === 139 ||
        error.code === 11 ||
        error.code === 132 ||
        error.code === 134
      ) {
        // RE
        data.result = "Runtime Error"; // Runtime Error
        status = "Runtime Error";
      } else {
        // WA
        data.result = "Wrong Answer"; // Wrong Answer
        status = "Wrong Answer";
      }
      emitTestResults("submission-" + submission.id.toString(), {
        ...data,
        done: i === testCases.length - 1,
      });
      await submissionResultsService.createSubmissionResult(data);
    }
    index++;
  }
  try {
    await submissionService.updateSubmission(submissionId, {
      testCasePassed,
      points: (testCasePassed / testCases.length) * problem.points,
    });
    if (accepted) {
      await userSolvedProblemService.createUserSolvedProblem({
        userId: submission.userId,
        problemId: submission.problemId,
      });

      await submissionService.updateSubmission(submissionId, {
        status: "Accepted",
      });
    } else {
      await submissionService.updateSubmission(submissionId, {
        status,
      });
    }
    // remove the folder submisison
    await shellCommand(`rm -rf ${submisisonPath}`);
  } catch (error) {
    throw error;
  }
};

export default {
  judgeSubmission,
};
