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

export default {
  getSubmissionById,
  updateSubmission,
};
