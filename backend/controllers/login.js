import bcrypt from "bcrypt";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
import jwt from "jsonwebtoken";
import { parseJwt } from "../utils/parseJwt.js";
import dotenv from "dotenv";
import { loginWithGoogle } from "../services/auth.js";
dotenv.config();

export const redirectToGoogleAuth = (req, res) => {
  const SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];
  console.log(process.env.GOOGLE_REDIRECT_URL);
  const url = `${process.env.GOOGLE_AUTH_URI}?client_id=${
    process.env.GOOGLE_CLIENT_ID
  }&redirect_uri=${
    process.env.GOOGLE_REDIRECT_URL
  }&response_type=code&scope=${SCOPES.join(" ")}`;
  console.log("Redirecting to Google Auth URL:", url);
  return res.redirect(url);
};
export const handleGoogleCallback = async (req, res) => {
  try {
    const code = req.query.code;
    const token = await loginWithGoogle(code);
    res.setHeader(
      "Set-Cookie",
      `jwt=${token}; HttpOnly; Path=/; Max-Age=432000; SameSite=None; Secure`
    );
    return res.redirect(process.env.FRONTEND_URL);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = req.cookies.jwt;

  const payload = parseJwt(token);
  const userId = payload?.id;

  if (payload) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
        solvedProblems: {
          include: {
            problem: true,
          },
        },
      },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: user,
    });
  }
  if (!email || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Email và mật khẩu là bắt buộc",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: email }, { username: email }] },
      include: {
        role: true,
        solvedProblems: {
          include: {
            problem: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }
    console.log(user,"!!!");
    if(!user.isActive) {
      return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
        success: false,
        message: "Tài khoản chưa được kích hoạt. Vui lòng kiểm tra email để kích hoạt tài khoản.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
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
    console.log(err.toString(), "error in login controller");
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
export default { login, logout, handleGoogleCallback, redirectToGoogleAuth };
