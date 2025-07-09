import bcrypt from "bcrypt";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { parseJwt } from "../utils/parseJwt.js";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = req.cookies.jwt;

  const payload = parseJwt(token);
  if (payload)
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: payload,
    });

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Email and password are required",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: email }, { username: email }] },
      include: {
        role: true,
      },
    });
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ ...user, password: "" }, process.env.JWT_SECRET, {
      // expiresIn: "2d",
    });

    res.setHeader(
      "Set-Cookie",
      `jwt=${token}; HttpOnly; Path=/; Max-Age=432000; SameSite=None; Secure`
    );
    return res.status(HTTP_STATUS.OK.code).json({
      data: user,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

const logout = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    "jwt=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure"
  );
  return res.status(HTTP_STATUS.OK.code).json({
    success: true,
    message: "Logged out successfully",
  });
};
export default { login, logout };
