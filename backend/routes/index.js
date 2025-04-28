import usersRouter from "./users.js";
import problemsRouter from "./problems.js";
import submissionsRouter from "./submissions.js";

// import contestsRouter from "./contests.js";
// import messagesRouter from "./messages.js";
import testCasesRouter from "./testCases.js";
import rolesRouter from "./roles.js";
import loginRouter from "./login.js";

import { isAdmin } from "../middlewares/isAdmin.js";
import { isUser } from "../middlewares/isUser.js";
import submissionResultsRouter from "./submissionResults.js";
const routeApp = function (app) {
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/problems", problemsRouter);
  app.use("/api/v1/submissions", submissionsRouter);
  // app.use("/api/v1/contests", isAdmin, contestsRouter);
  // app.use("/api/v1/messages", isUser, messagesRouter);
  app.use("/api/v1/test-cases", isAdmin, testCasesRouter);
  app.use("/api/v1/roles", isAdmin, rolesRouter);
  app.use("/api/v1/login", loginRouter);
  app.use("/api/v1/submissionsResult", submissionResultsRouter);
};

export default routeApp;
