import companyService from "../services/company.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

const getCompanies = async (req, res) => {
  try {
    const companies = await companyService.getCompanies();
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: error.message,
    });
  }
};
const createCompany = async (req, res) => {
  const data = req.body;
  if (!data.name) {
    throw new Error("Name is required");
  }
  if (data.name.trim() === "") {
    throw new Error("Name cannot be empty");
  }
  if (data.name.length > 100) {
    throw new Error("Name cannot exceed 100 characters");
  }

  try {
    const company = await companyService.createCompany(data);
    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteCompany = async (req, res) => {
  const companyId = parseInt(req.params.id);
  if (isNaN(companyId)) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Invalid company ID",
    });
  }

  try {
    const company = await companyService.deleteCompany(companyId);
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: error.message,
    });
  }
};
const updateCompany = async (req, res) => {
  const companyId = parseInt(req.params.id);
  const data = req.body;
  if (isNaN(companyId)) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Invalid company ID",
    });
  }
  if (!data.name) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Name is required",
    });
  }
  if (data.name.trim() === "") {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Name cannot be empty",
    });
  }
  if (data.name.length > 100) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Name cannot exceed 100 characters",
    });
  }

  try {
    const company = await companyService.updateCompany(companyId, data);
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createCompany,
  getCompanies,
  deleteCompany,
  updateCompany,
};
