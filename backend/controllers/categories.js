import { prisma } from "../prisma/prisma-client.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: category,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(HTTP_STATUS.NOT_FOUND.code).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: category,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const getCategories = async (req, res) => {
  console.log("TRI");
  try {
    const categories = await prisma.category.findMany({});

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: err.toString(),
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // if (!name || !description) {
  //   return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
  //     success: false,
  //     message: "Name and description are required",
  //   });
  // }

  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: category,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return res.status(HTTP_STATUS.NO_CONTENT.code).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: err.toString(),
    });
  }
};
export {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
