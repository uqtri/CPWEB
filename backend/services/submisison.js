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

export default {
  getSubmissionById,
};
