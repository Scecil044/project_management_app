import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { auth } from "../utils/auth.js";

const router = express.Router();

router.get("/:userId", auth, getUser);
router.get("/", auth, getUsers);
router.put("/:userId", auth, updateUser);
router.delete("/:userId", auth, deleteUser);

export default router;
