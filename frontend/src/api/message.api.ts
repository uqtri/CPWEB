import { axiosInstance } from "@/lib/axios";

export const getMessageByConversationId = async ({
  conversationId,
  params,
}: {
  conversationId: number;
  params?: string;
}): Promise<any[]> => {
  const response = await axiosInstance.get(
    `/messages/conversation/${conversationId}?${params || ""}`
  );
  return response.data.data;
};

export const createMessage = async (data: any) => {
  const response = await axiosInstance.post("/messages", data);
  return response.data.data;
};
