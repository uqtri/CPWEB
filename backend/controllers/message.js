import { HTTP_STATUS } from "../constants/httpStatus.js";
import messageService from "../services/message.js";
export const getMessagesByConversationId = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await messageService.getMessagesByConversationId({
      conversationId,
      query: req.query,
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
const createMessage = async (req, res) => {
  const data = req.body;
  console.log("Creating message with data:", data);
  if (!data.senderId) {
    const user = parseJwt(req.cookies.jwt);
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
        success: false,
        message: "Unauthorized",
      });
    }
    data.senderId = user.id;
  }
  try {
    const message = await messageService.createMessage(data);
    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: message,
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
  getMessagesByConversationId,
  createMessage,
};
