import express from "express";
import authController from "../controllers/auth.js";
const router = express.Router();

router.get("/google", authController.redirectToGoogleAuth);
router.get("/google/callback", authController.handleGoogleCallback);

export default router;
