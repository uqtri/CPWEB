import { parseJwt } from "../utils/parseJwt.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
const isAdmin = async (req, res, next) => {
  const jwt = req.cookies.jwt;
  const payload = parseJwt(jwt);
  if (!payload) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED.code)
      .json({ message: HTTP_STATUS.UNAUTHORIZED.message, success: false });
  }
  const role = await prisma.role.findUnique({
    where: {
      id: payload.roleId,
    },
    select: {
      name: true,
    },
  });
  console.log("Role:", role);

  if (role.name !== "admin" && payload.username !== "admin") {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED.code)
      .json({ message: HTTP_STATUS.UNAUTHORIZED.message, success: false });
  }
  next();
};
export { isAdmin };
