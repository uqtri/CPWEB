import submissionService from "./submisison.js";
import problemService from "./problems.js";
import submissionResultsService from "./submissionResults.js";
import userSolvedProblemService from "./userSolvedProblem.js";
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
  const submisisonPath = path.join(
    savedSubmissionsPath,
    "submission-" + submissionId.toString()
  ); // path to save submission
  let problem;
  let submission;
  try {
    submission = await submissionService.getSubmissionById(submissionId);
    problem = await problemService.getProblemById(submission.problemId);
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
    problem.slug
  ); // path to save test cases of the problem
  const testCases = await readDirAsync(testCasesPath);

  const command =
    `docker run --name submission-${submissionId} -d ` +
    `-v ${testCasesPath}:/test-cases ` +
    `-v ${submisisonPath}:/code ` +
    `-w /code ` +
    `--memory ${problem.memoryLimit}M ` +
    `frolvlad/alpine-gxx tail -f /dev/null`;

  // remove the container if it exists
  await shellCommand(`docker rm -f submission-${submissionId}`);
  // run container

  try {
    await shellCommand(command);
  } catch (error) {
    // await rmdirAsync(submisisonPath, { recursive: true, force: true });
    throw error;
  }
  // compile the code
  const compileCommand = `docker exec submission-${submissionId} sh -c "g++ main.cpp -o main"`;

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

    await shellCommand(`docker rm -f submission-${submissionId}`);
    throw error;
  }

  let index = 0;
  let accepted = true;
  for (const testCase of testCases) {
    const inputFile = path.join("..", "test-cases", testCase, "input.INP");
    const outputFile = path.join("..", "test-cases", testCase, "output.OUT");
    const commandRun = `docker exec submission-${submissionId} sh -c "timeout ${problem.executionTime}s ./main < ${inputFile} > "output.inp" && diff ${outputFile} output.inp"`;

    try {
      await shellCommand(commandRun);
      const data = {
        index: index + 1,
        result: "Accepted",
        submissionId: submission.id,
      };
      emitTestResults("submission-" + submission.id.toString(), data);
      await submissionResultsService.createSubmissionResult(data);
    } catch (error) {
      accepted = false;
      let data = {
        index: index + 1,
        submissionId: submission.id,
      };

      if (error.code === 124) {
        data.result = "Time Limit Exceeded"; // Time Limit Exceeded
      } else if (error.code === 139) {
        // RE
        data.result = "Runtime Error"; // Runtime Error
      } else {
        // WA
        data.result = "Wrong Answer"; // Wrong Answer
      }
      emitTestResults("submission-" + submission.id.toString(), data);
      await submissionResultsService.createSubmissionResult(data);
    }
    index++;
  }
  try {
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
        status: "Wrong Answer",
      });
    }
    // remove the container
    await shellCommand(`docker rm -f submission-${submissionId}`);
  } catch (error) {
    throw error;
  }
};

export default {
  judgeSubmission,
};
