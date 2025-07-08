import { Worker } from "bullmq";
import { connection } from "../ioredis/ioredis.js";
import { prisma } from "../../prisma/prisma-client.js";
import { shellCommand } from "../../utils/shell.js";
import { randomString } from "../../utils/randomString.js";
import fs from "fs";
import { promisify } from "util";
import { rootPath } from "../../utils/path.js";
import submissionResultsController from "../../controllers/submissionResults.js";
import { emitTestResults } from "../../socket/emitters/submission.js";
import judgeService from "../../services/judge.js";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const readDirAsync = promisify(fs.readdir);

const cppWorker = new Worker(
  "cpp-submissions",
  async (job) => {
    const data = job.data;
    const submissionId = data.submissionId;
    try {
      await judgeService.judgeSubmission(submissionId);
    } catch (error) {
    }
  },
  { connection }
);
