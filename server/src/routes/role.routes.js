import express from "express";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from "../controllers/role.controller.js";
import { auth } from "../utils/auth.js";

const router = express.Router();

router.get("/", auth, getRoles);
router.get("/:roleId", auth, getRole);
router.post("/", auth, auth, createRole);
router.put("/:roleId", auth, updateRole);
router.delete("/:roleId", auth, deleteRole);

export default router;
