import express from "express";
import contestRegistrationController from "../controllers/contestRegistration.js";
const router = express.Router();

router.get(
  "/contest/:contestId",
  contestRegistrationController.getRegistrationsByContestId
);
router.get(
  "/user/:userId",
  contestRegistrationController.getContestRegistrationsByUserId
);
router.post(
  "/contest/:contestId",
  contestRegistrationController.registerContest
);

export default router;
