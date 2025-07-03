import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.js";
const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);

export default router;
