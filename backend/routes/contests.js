import express from "express";
import contestsController from "../controllers/contests.js";

const router = express.Router();

router.get("", contestsController.getContests);
router.get(
  "/:contestSlug/leaderboard",
  contestsController.getLeaderboardByContestSlug
);
router.post("", contestsController.createContest);
router.put("/:contestId", contestsController.updateContest);

// router.delete("/contest/:contestId", contestsController.deleteContest);
router.get("/:contestSlug", contestsController.getContestBySlug);
export default router;
