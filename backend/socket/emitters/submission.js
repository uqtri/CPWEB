import { socketServer } from "../socket.js";

const emitTestResults = (roomId, data) => {
  console.log("Emitting test results to room:", roomId, "with data:", data);
  socketServer.to(roomId).emit("getSubmissionResult", { result: data });
};

export { emitTestResults };
