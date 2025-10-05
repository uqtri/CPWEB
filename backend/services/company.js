import { prisma } from "../prisma/prisma-client.js";
const createCompany = async (data) => {
  const { name } = data;
  if (!name) {
    throw new Error("Name is required");
  }
  try {
    const company = await prisma.company.create({
      data,
    });
    return res.status(201).json({ success: true, data: company });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getCompanies = async () => {
  try {
    const companies = await prisma.company.findMany({
      where: { isDeleted: false },
    });
    return companies;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteCompany = async (companyId) => {
  companyId = parseInt(req.params.id);
  if (isNaN(companyId)) {
    throw new Error("Invalid company ID");
  }

  try {
    const company = await prisma.company.update({
      where: { id: companyId },
      data: { isDeleted: true },
    });
    return company;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateCompany = async (companyId, data) => {
  companyId = parseInt(req.params.id);
  if (isNaN(companyId)) {
    throw new Error("Invalid company ID");
  }
  try {
    const company = await prisma.company.update({
      where: { id: companyId },
      data,
    });
    return company;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createCompany,
  getCompanies,
  deleteCompany,
  updateCompany,
};
