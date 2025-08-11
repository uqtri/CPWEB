import exppress from "express";
import authController from "../controllers/login.js";

const router = exppress.Router();
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/google", authController.redirectToGoogleAuth);
router.get("/google/callback", authController.handleGoogleCallback);

export default router;
