import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
const createRole = async (req, res) => {
  const roleData = req.body;
  try {
    const role = await prisma.role.create({
      data: roleData,
    });
    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: role,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      status: HTTP_STATUS.BAD_REQUEST.message,
      success: false,
      message: err.toString(),
    });
  }
};
const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({});
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: roles,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      status: HTTP_STATUS.BAD_REQUEST.message,
      success: false,
      message: err.toString(),
    });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await prisma.role.delete({
      where: { id: parseInt(id) },
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: role,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const updateRole = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const role = await prisma.role.update({
      where: { id: parseInt(id) },
      data,
    });
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: role,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

export default {
  createRole,
  getRoles,
  deleteRole,
  updateRole,
};
