import express from "express";
import usersController from "../controllers/users.js";

const router = express.Router();
router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
export default router;
