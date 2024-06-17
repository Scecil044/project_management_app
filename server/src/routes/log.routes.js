import {
  deleteSystemLog,
  searchForLog,
} from "../controllers/logs.controller.js";
import { auth } from "../utils/auth.js";

import express from "express";

const router = express.Router();

router.get("/search", auth, searchForLog);
router.delete("/:logId", auth, deleteSystemLog);

export default router;
