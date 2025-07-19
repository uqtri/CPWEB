import express from "express";
import messagesController from "../controllers/message.js";
const router = express.Router();

router.get(
  "/conversation/:conversationId",
  messagesController.getMessagesByConversationId
);
router.post("/", messagesController.createMessage);

export default router;
