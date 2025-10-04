import exppress from "express";
import authController from "../controllers/auth.js";

const router = exppress.Router();
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/google", authController.redirectToGoogleAuth);
router.get("/google/callback", authController.handleGoogleCallback);
router.post("/send-activation-email", authController.sendActivationEmail);
router.post(
  "/send-change-password-email",
  authController.sendChangePasswordEmail
);
router.post("/handle-activation", authController.handleActivation);
router.post("/handle-change-password", authController.handleChangePassword);
export default router;
