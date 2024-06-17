import express from "express";
import {
  googleAuth,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { auth } from "../utils/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", auth, logout);
router.post("/google/auth", googleAuth);

export default router;
