import express from "express";
import problemsController from "../controllers/problems.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/", problemsController.getProblems);
router.get("/:id", problemsController.getProblemById);
router.post("/", problemsController.createProblem);
router.put("/:id", isAdmin, problemsController.updateProblem);
export default router;
