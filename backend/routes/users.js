import express from "express";
import usersController from "../controllers/users.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();
router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/:id", upload.single("avatar-upload"), usersController.updateUser);
export default router;
