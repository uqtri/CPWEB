import express from "express";
import conversationsController from "../controllers/conversation.js";

const router = express.Router();

router.get("/:id", conversationsController.getConversationById);
router.post("/", conversationsController.createConversation);
router.get("/user/:userId", conversationsController.getConversationsByUserId);
export default router;
