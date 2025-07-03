import { axiosInstance } from "../libs/axios/axios";
import type {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from "../types/category";

export const getCategoryList = async (params: any): Promise<Category[]> => {
  const response = await axiosInstance.get("/categories", { params });
  return response.data;
};
export const updateCategory = async (
  id: number,
  data: UpdateCategoryData
): Promise<Category> => {
  const response = await axiosInstance.put(`/categories/${id}`, data);
  return response.data;
};

export const createCategory = async (
  data: CreateCategoryData
): Promise<Category> => {
  const response = await axiosInstance.post("/categories", data);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};
