import express from "express";
import submissionsController from "../controllers/submissions.js";
const router = express.Router();

router.get("/:userId", submissionsController.getSubmissionsByUserId);
router.post("/:userId", submissionsController.createSubmission);

export default router;
