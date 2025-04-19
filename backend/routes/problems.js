import express from "express";
import problemsController from "../controllers/problems.js";
const router = express.Router();

router.get("/", problemsController.getProblems);
router.get("/:id", problemsController.getProblemById);
router.post("/", problemsController.createProblem);
router.put("/:id", problemsController.updateProblem);
export default router;
