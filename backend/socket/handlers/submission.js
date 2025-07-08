export const handleSubmission = ({ socket, io }) => {
  socket.on("submission:join", async (data) => {
    console.log("JOINED SUBMISSION", data);
    const submissionId = data.submissionId;
    const userId = socket.handshake.query.userId;
    socket.join(`submission-${data.submissionId.toString()}`);
  });
  socket.on("submission:leave", async (data) => {
    console.log("LEFT SUBMISSION", data);
    const submissionId = data.submissionId;
    socket.leave(`submission + ${data.submissionId.toString()}`);
  });
};
