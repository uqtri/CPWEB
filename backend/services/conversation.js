import { prisma } from "../prisma/prisma-client.js";
export const createConversation = async (data) => {
  const { participants, isGroup, isCommunity, name } = data;
  if ((!participants || participants.length === 0) && !isCommunity) {
    throw new Error("Participants are required to create a conversation");
  }
  try {
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          connect: participants?.map((id) => ({ id })),
        },
        isGroup,
        isCommunity,
        name,
      },
    });
    return conversation;
  } catch (error) {
    throw error;
  }
};
export const deleteConversationById = async (id) => {
  try {
    const conversation = await prisma.conversation.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });
  } catch (error) {
    throw error;
  }
};
export const getConversationById = async (id) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: parseInt(id) },
      include: {
        participants: true,
        messages: {
          include: {
            sender: true,
          },
        },
      },
    });
    return conversation;
  } catch (error) {
    throw error;
  }
};
export const getConversationsByUserId = async (userId) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            participants: {
              some: {
                id: parseInt(userId),
              },
            },
          },
          {
            isCommunity: true,
          },
        ],
        isDeleted: false,
      },
      include: {
        participants: true,
        //   messages: {
        //     include: {
        //       sender: true,
        //     },
        //   },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return conversations;
  } catch (error) {
    throw error;
  }
};
export default {
  createConversation,
  deleteConversationById,
  getConversationById,
  getConversationsByUserId,
};
