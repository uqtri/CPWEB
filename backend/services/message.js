import { prisma } from "../prisma/prisma-client.js";
export const createMessage = async (data) => {
  if (!data.conversationId || !data.senderId || !data.content) {
    throw new Error(
      "Conversation ID, sender ID, and content are required to create a message"
    );
  }
  try {
    const message = await prisma.message.create({
      data,
    });
    await prisma.conversation.update({
      where: { id: message.conversationId },
      data: {
        updatedAt: new Date(),
        lastMessage: data.content,
      },
    });
    return message;
  } catch (error) {
    throw error;
  }
};

export const getMessagesByConversationId = async ({
  conversationId,
  query,
}) => {
  const { limit = 10, id = 1 } = query;

  const whereConditions = {
    conversationId: parseInt(conversationId),
    isDeleted: false,
    id: {
      lte: parseInt(id),
    },
  };
  console.log("Fetching messages with conditions:", whereConditions);
  try {
    const messages = await prisma.message.findMany({
      where: whereConditions,
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(limit),
    });
    return messages;
  } catch (error) {
    throw error;
  }
};
export const deleteMessageById = async (messageId) => {
  try {
    const message = await prisma.message.update({
      where: { id: parseInt(messageId) },
      data: { isDeleted: true },
    });
    return message;
  } catch (error) {
    throw error;
  }
};
export const updateMessageById = async (messageId, content) => {
  try {
    const message = await prisma.message.update({
      where: { id: parseInt(messageId) },
      data: { content },
    });
    return message;
  } catch (error) {
    throw error;
  }
};
export default {
  getMessagesByConversationId,
  createMessage,
  updateMessageById,
  deleteMessageById,
};
