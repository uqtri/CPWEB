import { prisma } from "../prisma/prisma-client.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
const createSubmissionResult = async (data) => {
  try {
    const { submissionId, testCaseId, result } = data;
    if (!submissionId || !result || !testCaseId) {
      return res.status(400).json({
        error: "Submission ID, Test Case ID and result are required",
      });
    }

    const newResult = { submissionId, testCaseId, result };
    const submissionResult = await prisma.submissionResult.create({
      data: newResult,
    });
    return submissionResult;
  } catch (error) {
    throw new Error("Error creating submission result: " + error.message);
  }
};
const getSubmissionResultsBySubmissionsId = async (req, res) => {
  try {
    let { submissionId } = req.params;

    if (!submissionId) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST.code)
        .json({ error: "Submission ID is required" });
    }
    submissionId = parseInt(submissionId, 10);
    const submissionResults = await prisma.submissionResult.findMany({
      where: { submissionId },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      data: submissionResults,
      success: true,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST.code)
      .json({ error: "Internal server error" });
  }
};

export default { createSubmissionResult, getSubmissionResultsBySubmissionsId };
