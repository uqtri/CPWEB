import { axiosInstance } from "../lib/axios";
import type {
  Submission,
  CreateSubmissionData,
  UpdateSubmissionData,
} from "../types/submission";
export const getSubmissionByProblemId = async (
  problemId: number,
  params: any
): Promise<Submission[]> => {
  const response = await axiosInstance.get(
    `/submissions/problem/${problemId}?${params || ""}`
  );
  return response.data;
};
export const getSubmissionById = async (
  submissionId: number
): Promise<Submission> => {
  const response = await axiosInstance.get(`/submissions/${submissionId}`);
  return response.data.data;
};
export const createSubmissions = async (
  data: CreateSubmissionData
): Promise<Submission> => {
  const response = await axiosInstance.post("/submissions", data);
  return response.data.data;
};
export const updateSubmission = async (
  id: number,
  data: UpdateSubmissionData
): Promise<Submission> => {
  const response = await axiosInstance.put(`/submissions/${id}`, data);
  return response.data;
};

export const getSubmissionsByUserId = async ({
  userId,
  params,
}: {
  userId: number;
  params?: string;
}): Promise<any> => {
  const response = await axiosInstance.get(
    `/submissions/user/${userId}?${params || ""}`
  );
  return response.data.data;
};
