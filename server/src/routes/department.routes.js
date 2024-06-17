import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  removeUserFromDepartment,
  updateDepartment,
} from "../controllers/department.controller.js";
import { auth } from "../utils/auth.js";

const router = express.Router();

router.get("/", auth, getDepartments);
router.get("/:departmentId", auth, getDepartment);
router.post("/", auth, createDepartment);
router.put("/:departmentId", auth, updateDepartment);
router.put("/:departmentId/:userId", auth, removeUserFromDepartment);
router.delete("/:departmentId", auth, deleteDepartment);

export default router;
