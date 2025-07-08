import express from "express";
import testCasesController from "../controllers/testCase.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.get(
  "/problemSlug/:problemSlug",
  testCasesController.getTestCaseByProblemSlug
);
router.post(
  "/problemId/:problemId",
  upload.single("test-cases"),
  testCasesController.createTestCase
);
router.put("/:id", testCasesController.updateTestCase);
router.delete("/:id", testCasesController.deleteTestCase);
router.get(
  "/problemSlug/:problemSlug/download",
  testCasesController.downloadZipTestCase
);
router.get(
  "/problemSlug/:problemSlug/download/:index",
  testCasesController.downloadTestCaseByIndex
);
export default router;
