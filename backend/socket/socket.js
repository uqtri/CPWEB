import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { handleSubmission } from "./handlers/submission.js";
import { chattingHandler } from "./handlers/chatting.js";
const app = express();
const server = createServer(app);
const socketServer = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://codeforge.id.vn"],
    credentials: true,
  },
});

socketServer.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  handleSubmission({ socket, io: socketServer });
  chattingHandler({ socket, io: socketServer });
});
export { app, socketServer, server };
