import { prisma } from "../prisma/prisma-client.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import bcrypt from "bcrypt";
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: users,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      status: HTTP_STATUS.BAD_REQUEST.message,
      message: err.toString(),
    });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const createUser = async (req, res) => {
  const userData = req.body;

  try {
    let password = userData.password;
    password = await bcrypt.hash(password, 10);
    userData.password = password;
    userData.roleId = 2;
    const user = await prisma.user.create({
      data: userData,
    });

    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error(err.toString());
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      status: HTTP_STATUS.BAD_REQUEST.message,
      success: false,
      message: "Tên người dùng hoặc email đã tồn tại",
    });
  }
};
const updateUser = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isBanned: true },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
