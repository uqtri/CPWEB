import usersRouter from "./users.js";
import problemsRouter from "./problems.js";
import submissionsRouter from "./submissions.js";
// import contestsRouter from "./contests.js";
// import messagesRouter from "./messages.js";

const routeApp = function (app) {
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/problems", problemsRouter);
  app.use("/api/v1/submissions", submissionsRouter);
  // app.use("/api/v1/contests", contestsRouter);
  // app.use("/api/v1/messages", messagesRouter);
};

export default routeApp;
