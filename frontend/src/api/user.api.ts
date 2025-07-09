import { axiosInstance } from "../lib/axios";

export const getAllUsers = async (params: string): Promise<any[]> => {
  const response = await axiosInstance.get(`/users?${params}`);
  return response.data.data;
};

// export const getUserById = async ():
