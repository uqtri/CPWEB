import { axiosInstance } from "../libs/axios/axios";

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
export const createTestCase = async (
  data: CreateTestCaseData
): Promise<TestCase> => {
  const response = await axiosInstance.post("/test-cases", data);
  return response.data;
};
export const updateTestCase = async (
  id: number,
  data: UpdateTestCaseData
): Promise<TestCase> => {
  const response = await axiosInstance.put(`/test-cases/${id}`, data);
  return response.data;
};
