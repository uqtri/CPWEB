import bcrypt from "bcrypt";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
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
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; secure`); // 1 day
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: { user, token },
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

export default { login };
