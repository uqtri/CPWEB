import express from "express";
import submissionResultsController from "../controllers/submissionResults.js";
import { isSubmissionOwner } from "../middlewares/isSubmissionOwner.js";
const router = express.Router();

router.get(
  "/:submissionId",
  isSubmissionOwner,
  submissionResultsController.getSubmissionResultsBySubmissionsId
);

export default router;
