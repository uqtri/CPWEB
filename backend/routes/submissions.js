import express from "express";
import submissionsController from "../controllers/submissions.js";
import { prisma } from "../prisma/prisma-client.js";
const router = express.Router();

router.get("/user/:userId", submissionsController.getSubmissionsByUserId);
router.post("", submissionsController.createSubmission);
router.get("/:submissionId", submissionsController.getSubmissionById);

export default router;
