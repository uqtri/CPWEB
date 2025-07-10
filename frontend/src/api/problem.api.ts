import { axiosInstance } from "../lib/axios";
import type {
  Problem,
  CreateProblemData,
  UpdateProblemData,
} from "../types/problem";
export const getProblemList = async (params: any) => {
  const response = await axiosInstance.get(`/problems?${params || ""}`);
  return response.data.data;
};

export const getProblemBySlug = async (slug: string): Promise<Problem> => {
  const response = await axiosInstance.get(`/problems/${slug}`);
  return response.data.data;
};
export const createProblem = async (
  data: CreateProblemData
): Promise<Problem> => {
  const response = await axiosInstance.post("/problems", data);
  return response.data.data;
};
export const updateProblem = async (
  id: number,
  data: UpdateProblemData
): Promise<Problem> => {
  const response = await axiosInstance.put(`/problems/${id}`, data);
  return response.data.data;
};

export const deleteProblem = async (id: number) => {
  const response = await axiosInstance.delete(`/problems/${id}`);
  return response.data.data;
};
