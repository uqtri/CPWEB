import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import { flowProducer } from "../jobs/flow/flow.js";
import { parseJwt } from "../utils/parseJwt.js";

const getSubmissionById = async (req, res) => {
  const submissionId = parseInt(req.params.submissionId);
  if (isNaN(submissionId)) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Invalid submission ID",
    });
  }
  try {
    const submission = await prisma.submission.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        problem: true,
        user: true,
      },
    });
    if (!submission) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        success: false,
        message: "Submission not found",
      });
    }
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: submission,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
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
  const data = req.body;
  const payload = parseJwt(req.cookies.jwt);
  if (!payload) {
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }
  const userId = payload.id;
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

    await flowProducer.add({
      name: `submission-${submission.id}`,
      data: {
        submissionId: submission.id,
      },
      queueName: "cpp-submissions",
    });

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
export default { createSubmission, getSubmissionsByUserId, getSubmissionById };
