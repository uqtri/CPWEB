import { socketServer } from "../socket.js";
export const emitChatMessage = (conversationId, message) => {
  console.log("Emit", conversationId, message);
  socketServer
    .to(`conversation-${conversationId}`)
    .emit("message:create", { conversationId, message });
};

export default {
  emitChatMessage,
};
  