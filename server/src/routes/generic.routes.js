import express from "express";
import { genericModelFilter } from "../controllers/generic.controller.js";
import { auth } from "../utils/auth.js";

const router = express.Router();

router.get("/", auth, genericModelFilter);

export default router;
