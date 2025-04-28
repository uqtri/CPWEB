import exppress from "express";
import loginController from "../controllers/login.js";

const router = exppress.Router();
router.post("/", loginController.login);

export default router;
