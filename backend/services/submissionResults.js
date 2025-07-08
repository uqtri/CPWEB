import { prisma } from "../prisma/prisma-client.js";
const createSubmissionResult = async (data) => {
  if (!data.submissionId) {
    throw new Error("Submission ID is required");
  }
  try {
    const submissionResult = await prisma.submissionResult.create({
      data,
    });
    return submissionResult;
  } catch (error) {
    console.error("Error creating submission result:", error);
    throw new Error("Failed to create submission result");
  }
};

export default {
  createSubmissionResult,
};
