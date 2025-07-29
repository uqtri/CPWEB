import { axiosInstance } from "@/lib/axios";
import { CreateConversationData } from "@/types/conversation";

export const createConversation = async (data: CreateConversationData) => {
  const response = await axiosInstance.post("/conversations", data);
  return response.data.data;
};
export const getConversationById = async (id: number) => {
  const response = await axiosInstance.get(`/conversations/${id}`);
  return response.data.data;
};
export const getConversationsByUserId = async (userId: number) => {
  const response = await axiosInstance.get(`/conversations/user/${userId}`);
  return response.data.data;
};
export const getDirectConversation = async ({ query }: { query: string }) => {
  const response = await axiosInstance.get(`/conversations/direct?${query}`);
  return response.data.data;
};
