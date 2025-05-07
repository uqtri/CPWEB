import express from "express";

import testCasesController from "../controllers/testCase.js";
const router = express.Router();

router.get("/:problemId", testCasesController.getTestCaseByProblemId);
router.post("/:problemId", testCasesController.createTestCase);
router.put("/:id", testCasesController.updateTestCase);
router.delete("/:id", testCasesController.deleteTestCase);
export default router;
``