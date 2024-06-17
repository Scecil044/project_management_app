import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  removeContributor,
  updateTask,
} from "../controllers/task.controller.js";
import { auth } from "../utils/auth.js";

const router = express.Router();

router.get("/", auth, getTasks);
router.get("/:taskId", auth, getTask);
router.post("/", auth, createTask);
router.put("/:taskId", auth, updateTask);
router.put("/:userId/:taskId", auth, removeContributor);
router.delete("/:taskId", auth, deleteTask);

export default router;
