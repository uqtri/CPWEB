import chattingEmitter from "../emitters/chatting.js";
export const chattingHandler = ({ socket, io }) => {
  socket.on("conversations:join", (data) => {
    // data is expected to be an array of conversation IDs
    console.log("JOINED CONVERSATIONS", data);
    data.map((conversationId) => {
      console.log("JOINED CONVERSATION", conversationId);
      socket.join(`conversation-${conversationId}`);
    });
  });

  socket.on("message:create", (data) => {
    console.log("MESSAGE CREATE", data);
    const { conversationId, message } = data;

    chattingEmitter.emitChatMessage(conversationId, message);
  });
};
