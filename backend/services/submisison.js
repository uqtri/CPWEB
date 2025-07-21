import { prisma } from "../prisma/prisma-client.js";
export const getSubmissionById = async (submissionId) => {
  if (isNaN(submissionId)) {
    throw new Error("Invalid submission ID");
  }
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    });
    return submission;
  } catch (error) {
    throw new Error("Error fetching submission by ID: " + error.message);
  }
};
export const updateSubmission = async (submissionId, data) => {
  if (isNaN(submissionId)) {
    throw new Error("Invalid submission ID");
  }
  try {
    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data,
    });
    return updatedSubmission;
  } catch (error) {
    throw new Error("Error updating submission: " + error.message);
  }
};
export const getSubmissionsByUserId = async ({ userId, query }) => {
  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }
  const whereConditions = {
    userId,
    language: query.language || undefined,
    status: query.status || undefined,
  };
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  console.log(
    "Fetching submissions for user:",
    userId,
    "with conditions:",
    whereConditions
  );
  try {
    const submissions = await prisma.submission.findMany({
      where: whereConditions,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        problem: true,
        user: true,
      },
    });
    const total = await prisma.submission.count({
      where: whereConditions,
    });
    const acceptedCount = await prisma.submission.count({
      where: { AND: [{ ...whereConditions }, { status: "Accepted" }] },
    });
    const wrongAnswerCount = await prisma.submission.count({
      where: {
        AND: [{ ...whereConditions }, { status: "Wrong Answer" }],
      },
    });
    const timeLimitExceededCount = await prisma.submission.count({
      where: {
        AND: [{ ...whereConditions }, { status: "Time limit exceeded" }],
      },
    });

    const memoryLimitExceededCount = await prisma.submission.count({
      where: {
        AND: [{ ...whereConditions }, { status: "Memory Limit Exceed" }],
      },
    });
    return {
      submissions,
      total,
      acceptedCount,
      wrongAnswerCount,
      timeLimitExceededCount,
      memoryLimitExceededCount,
    };
  } catch (error) {
    throw new Error("Error fetching submissions by user ID: " + error.message);
  }
};
export default {
  getSubmissionById,
  updateSubmission,
  getSubmissionsByUserId,
};
