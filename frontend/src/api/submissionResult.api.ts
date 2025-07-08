import { axiosInstance } from "../lib/axios";

export const getSubmissionResultBySubmissionId = async (
  submissionId: number
): Promise<any> => {
  const response = await axiosInstance.get(
    `/submission-results/submissionId/${submissionId}`
  );
  return response.data.data;
};
