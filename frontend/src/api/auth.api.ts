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
  const response = await axiosInstance.post(
    "/auth/send-change-password-email",
    {
      email,
    }
  );
  return response.data;
};

export const handleActivation = async (data: {
  email: string;
  token: string;
}) => {
  const response = await axiosInstance.post("/auth/handle-activation", data);
  return response.data;
};
export const handleChangePassword = async (data: {
  email: string;
  token: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.post(
    "/auth/handle-change-password",
    data
  );
  return response.data;
};
