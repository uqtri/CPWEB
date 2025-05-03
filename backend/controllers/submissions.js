import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import { flowProducer } from "../jobs/flow/flow.js";

const getSubmissionsByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Invalid user ID",
    });
  }
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        userId,
      },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: submissions,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: err.toString(),
      message: "Failed to fetch submissions.",
    });
  }
};

const createSubmission = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const data = req.body;
  data.userId = userId;
  
  if (isNaN(userId)) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Invalid user ID",
    });
  }

  try {
    const submission = await prisma.submission.create({
      data,
    });
    const testcases = await prisma.testCase.findMany({
      where: {
        problemId: submission.problemId,
      },
      select: {
        id: true,
      },
    });
    const jobs = testcases.map((testcase) => {
      return {
        name: `testcase-${testcase.id}`,
        data: {
          submissionId: submission.id,
          testcaseId: testcase.id,
        },
        queueName: "cpp-testCases",
      };
    });

    const flow = await flowProducer.add({
      name: `submission-${submission.id}`,
      data: {
        submissionId: submission.id,
      },
      queueName: "cpp-submissions",
      children: jobs,
    });
    console.log("Flow created:");

    return res.status(HTTP_STATUS.OK.code).json({
      data: submission,
      success: true,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      message: "Failed to create submission." + err.toString(),
      success: false,
    });
  }
};
export default { createSubmission, getSubmissionsByUserId };
