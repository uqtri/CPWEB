import exppress from "express";
import authController from "../controllers/login.js";

const router = exppress.Router();
router.post("/login", authController.login);
router.post("/logout", authController.logout);
export default router;
