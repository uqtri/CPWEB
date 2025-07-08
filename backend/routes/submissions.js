import express from "express";
import submissionsController from "../controllers/submissions.js";
const router = express.Router();

router.get("/userId/:userId", submissionsController.getSubmissionsByUserId);
router.post("", submissionsController.createSubmission);
router.get("/:submissionId", submissionsController.getSubmissionById);
export default router;
