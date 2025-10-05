import express from "express";
import companyController from "../controllers/company.js";
const router = express.Router();

router.get("/", companyController.getCompanies);
router.post("/", companyController.createCompany);
router.delete("/:id", companyController.deleteCompany);
router.put("/:id", companyController.updateCompany);

export default router;
