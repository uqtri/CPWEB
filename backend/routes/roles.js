import express from "express";
import rolesController from "../controllers/roles.js";

const router = express.Router();
// import { isAdmin } from "../middlewares/isAdmin.js";

router.get("/", rolesController.getRoles);
router.post("/", rolesController.createRole);
router.delete("/:id", rolesController.deleteRole);
router.put("/:id", rolesController.updateRole);
export default router;
