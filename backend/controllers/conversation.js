import conversationService from "../services/conversation.js";
import { parseJwt } from "../utils/parseJwt.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
export const getConversationsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await conversationService.getConversationsByUserId(
      userId
    );
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
export const createConversation = async (req, res) => {
  const data = req.body;
  const user = parseJwt(req.cookies.jwt);
  if (!user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      success: false,
      message: "Unauthorized",
    });
  }
  data.authorId = user.id;
  try {
    const conversation = await conversationService.createConversation(data);
    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
export const getConversationById = async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await conversationService.getConversationById(id);
    if (!conversation) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        success: false,
        message: "Conversation not found",
      });
    }
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
    });
  }
};

export const getDirectConversation = async (req, res) => {
  console.log(req.query.participants, "@@");
  const data = { participants: req.query.participants.map((p) => parseInt(p)) };

  try {
    const conversation = await conversationService.getDirectConversation(data);
    if (!conversation) {
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        success: false,
        message: "Conversation not created",
      });
    }
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.log(error.toString());
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
export default {
  getConversationsByUserId,
  createConversation,
  getConversationById,
  getDirectConversation,
};
