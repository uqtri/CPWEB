import { socketServer } from "../socket.js";

const emitTestResults = (id, data) => {
  console.log("EMITTING TEST RESULTS", id, data);
  let room = id.toString();
  socketServer.to(room).emit("getSubmissionResult", { result: data });
};

export { emitTestResults };
