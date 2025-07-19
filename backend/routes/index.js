import usersRouter from "./users.js";
import problemsRouter from "./problems.js";
import submissionsRouter from "./submissions.js";
import contestsRouter from "./contests.js";
import messagesRouter from "./messages.js";
import testCasesRouter from "./testCases.js";
import rolesRouter from "./roles.js";
import loginRouter from "./login.js";
import categoriesRouter from "./categories.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isUser } from "../middlewares/isUser.js";
import submissionResultsRouter from "./submissionResults.js";
import contestRegistrationRouter from "./contestRegistration.js";
import conversationsRouter from "./conversation.js";
const routeApp = function (app) {
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/problems", problemsRouter);
  app.use("/api/v1/submissions", submissionsRouter);
  app.use("/api/v1/contests", contestsRouter);
  app.use("/api/v1/contest-registrations", contestRegistrationRouter); // Assuming you want to protect this route with isUser middleware
  app.use("/api/v1/messages", messagesRouter);
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/test-cases", testCasesRouter);
  app.use("/api/v1/roles", rolesRouter);
  app.use("/api/v1/auth", loginRouter);
  app.use("/api/v1/submission-results", submissionResultsRouter);
  app.use("/api/v1/conversations", conversationsRouter);
};

export default routeApp;
