import { axiosInstance, axiosFormDataInstance } from "../lib/axios";

export const getAllUsers = async (params: string): Promise<any> => {
  const response = await axiosInstance.get(`/users?${params}`);
  return response.data.data;
};
export const getUserById = async (userId: number): Promise<any> => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data.data;
};
export const getUsersByUsername = async (username: string): Promise<any> => {
  const response = await axiosInstance.get(`/users/username/${username}`);
  return response.data.data;
};
export const updateUser = async (
  userId: number,
  formData: FormData
): Promise<any> => {
  const response = await axiosFormDataInstance.put(
    `/users/${userId}`,
    formData
  );
  return response.data.data;
};
// export const getUserById = async ():
