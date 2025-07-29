import chattingEmitter from "../emitters/chatting.js";
export const chattingHandler = ({ socket, io }) => {
  socket.on("conversation:create", async (data) => {
    data.participants?.map((id) => {
      io.to(`user-${id}`).emit("conversation:create");
    });
  });
  socket.on("conversations:join", (data) => {
    data.map((conversationId) => {
      console.log("JOINED CONVERSATION", socket.id, conversationId);
      socket.join(`conversation-${conversationId}`);
    });
    console.log("📦 Current rooms:", Array.from(socket.rooms));
  });

  socket.on("message:create", (data) => {
    const { conversationId, message } = data;
    console.log("Received from", socket.id);
    console.log("MESSAGE CREATE", conversationId, message);
    chattingEmitter.emitChatMessage(conversationId, message);
  });
};
