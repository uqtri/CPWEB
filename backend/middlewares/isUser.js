import { parseJwt } from "../utils/parseJwt.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
const isUser = function (req, res, next) {
  const jwt = req.cookies.jwt;

  const payload = parseJwt(jwt);
  if (!payload) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED.code)
      .json({ message: HTTP_STATUS.UNAUTHORIZED.message, success: false });
  }
  next();
};
export { isUser };
