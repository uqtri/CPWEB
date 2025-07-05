import { axiosInstance, axiosFormDataInstance } from "../lib/axios";

import type {
  TestCase,
  CreateTestCaseData,
  UpdateTestCaseData,
} from "../types/testCase";
export const getTestCaseList = async (
  problemId: number
): Promise<TestCase[]> => {
  const response = await axiosInstance.get(
    `/test-cases/problemId:/${problemId}`
  );
  return response.data;
};
export const getTestCaseById = async (id: number): Promise<TestCase> => {
  const response = await axiosInstance.get(`/test-cases/${id}`);
  return response.data;
};
export const createTestCase = async (problemId: number, data: FormData) => {
  const response = await axiosFormDataInstance.post(
    `/test-cases/problemId/${problemId}`,
    data
  );
  return response.data;
};
export const updateTestCase = async (prolemId: number, data: FormData) => {
  const response = await axiosFormDataInstance.put(
    `/test-cases/problemId/${prolemId}`,
    data
  );
  return response.data;
};
