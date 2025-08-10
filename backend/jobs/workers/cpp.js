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

const cppWorker = new Worker(
  "cpp-submissions",
  async (job) => {
    const data = job.data;
    const submissionId = data.submissionId;
    console.log("JOBS");
    try {
      await judgeService.judgeSubmission(submissionId);
    } catch (error) {
      console.log(error);
    }
  },
  { connection }
);
