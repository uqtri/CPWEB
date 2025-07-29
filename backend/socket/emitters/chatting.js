import { socketServer } from "../socket.js";
export const emitChatMessage = (conversationId, message) => {
  console.log("Emit DATA", conversationId, message, "@@");
  try {
    socketServer
      .to(`conversation-${conversationId}`)
      .emit("message:create", { conversationId, message });
  } catch (error) {
    console.error("Error emitting chat message:", error);
  }
};

export default {
  emitChatMessage,
};
