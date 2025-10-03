import { axiosInstance } from "@/lib/axios";

export const login = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const sendActivationEmail = async (email: string) => {
  const response = await axiosInstance.post("/auth/send-activation-email", {
    email,
  });
  return response.data;
};
export const sendChangePasswordEmail = async (email: string) => {
  const response = await axiosInstance.post("/auth/change-password", {
    email,
  });
  return response.data;
};
