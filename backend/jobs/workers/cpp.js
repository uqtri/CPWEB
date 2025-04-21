import { Worker } from "bullmq";
import { connection } from "../ioredis/ioredis.js";
import { prisma } from "../../prisma/prisma-client.js";
import { shellCommand } from "../../utils/shell.js";
import { randomString } from "../../utils/randomString.js";
import fs from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const cppWorker = new Worker(
  "cpp",
  async (job) => {
    const data = job.data;
    const submissionId = data.submissionId;
    try {
      const submission = await prisma.submission.findUnique({
        where: {
          id: submissionId,
        },
      });
      throw new Error("Cannot get submission from database");
    } catch (err) {
      throw new Error("Cannot get submission from database");
    }
  },
  { connection }
);
const cppTestCaseWorker = new Worker("cpp-testcase", async (job) => {
  const data = job.data;
  const submissionId = data.submissionId;
  const testcaseId = data.testcaseId;
  const testCase = await prisma.testCase.findUnique({
    where: {
      id: testcaseId,
    },
  });
  if (!testCase) {
    throw new Error("Test case not found");
  }
  const submission = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
  });
  if (!submission) {
    throw new Error("Submission not found");
  }
  const filename = randomString(20);
  const inputFile = randomString(20);

  const code = submission.code;
  const input = testCase.input;

<<<<<<< Updated upstream
  const command = `sudo docker run --rm -d \
    -v "$PWD":/code \
    -w /code \
    frolvlad/alpine-gxx \
    g++ ${filename}.cpp -o ${filename} && ./$filename < ${input}.txt`;
=======
  // const command = `sudo docker run --rm -d \
  //   -v "$PWD":/code \
  //   -w /code \
  //   frolvlad/alpine-gxx \
  //   g++ ${filename}.cpp -o ${filename} && ./$filename < ${input}.txt`;
  const command = `docker run --rm -i ^
  -v %cd%:/code ^
  -w /code ^
  frolvlad/alpine-gxx ^
  sh -c "g++ ${filename}.cpp -o ${filename} && ./${filename} < ${inputFile}.txt"`;
>>>>>>> Stashed changes

  try {
    await writeFileAsync(`./${filename}.cpp`, code);
    await writeFileAsync(`./${inputFile}.txt`, input);
  } catch (err) {
    throw new Error("Cannot write file from cpp worker");
  }
  try {
    const result = await shellCommand(command);
    const output = testCase.output;
  } catch (err) {
    console.error("Error executing shell command:", err);
    throw new Error("Error executing shell command");
  }
  return output.trim() === testCase.output.trim()
    ? { testcaseId, result: "passed" }
    : { testcaseId, result: "failed" };
});

// `sudo docker run --rm -d frolvlad/alpine-gxx g++ -o ${filename}.cpp ${filename} && ./$filename`
