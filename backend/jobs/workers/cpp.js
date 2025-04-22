import { Worker } from "bullmq";
import { connection } from "../ioredis/ioredis.js";
import { prisma } from "../../prisma/prisma-client.js";
import { shellCommand } from "../../utils/shell.js";
import { randomString } from "../../utils/randomString.js";
import fs from "fs";
import { promisify } from "util";
import { rootPath } from "../../utils/path.js";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const cppWorker = new Worker(
  "cpp-submissions",
  async (job) => {
    console.log("CPP_SUBMISSION WORKER");
    const data = job.data;
    const submissionId = data.submissionId;
    const childrenValues = await job.getChildrenValues();
    console.log(childrenValues);
  },
  { connection }
);
const cppTestCaseWorker = new Worker(
  "cpp-testCases",
  async (job) => {
    const data = job.data;
    const submissionId = data.submissionId;
    const testcaseId = data.testcaseId;
    const testCase = await prisma.testCase.findUnique({
      where: {
        id: testcaseId,
      },
    });
    if (!testCase) {
      return {
        testcaseId,
        result: "passed",
      };
      // throw new Error("Test case not found");
    }
    const submission = await prisma.submission.findUnique({
      where: {
        id: submissionId,
      },
    });
    if (!submission) {
      throw new Error("Submission not found");
    }
    const filename = randomString(10);
    const inputFile = randomString(10);
    const code = submission.code;
    const input = testCase.input;
    const command = `docker run --rm -i -v ${rootPath}/upload/temp:/code -w /code frolvlad/alpine-gxx sh -c "g++ ${filename}.cpp -o ${filename} && ./${filename} < ${inputFile}.txt"`;
    let result = "";
    try {
      await writeFileAsync(`${rootPath}/upload/temp/${filename}.cpp`, code);
      await writeFileAsync(`${rootPath}/upload/temp/${inputFile}.txt`, input);
    } catch (err) {
      throw new Error("Cannot write file from cpp worker");
    }
    try {
      result = await shellCommand(command);
    } catch (err) {
      console.error("Error executing shell command:", err);
      throw new Error("Error executing shell command");
    }
    try {
      await shellCommand(`del ${rootPath}/upload/temp/${filename}.cpp`);
      await shellCommand(`del ${rootPath}/upload/temp/${inputFile}.txt`);
      await shellCommand(`del ${rootPath}/upload/temp/${filename}`);
    } catch (err) {
      console.error("Error removing file:", err);
      throw new Error("Error removing file");
    }
    // create result to db

    return result.trim() === testCase.output.trim()
      ? { testcaseId, result: "passed" }
      : { testcaseId, result: "failed" };
  },
  { connection }
);

cppTestCaseWorker.on("failed", async (job, err) => {
  console.log("Job failed:", job.id, err);
});
