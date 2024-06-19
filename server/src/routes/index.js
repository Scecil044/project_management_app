import { Router } from "express";
import authRoutes from "./auth.routes.js";
import roleRoutes from "./role.routes.js";
import departmentRoutes from "./department.routes.js";
import taskRoutes from "./task.routes.js";
import userRoutes from "./user.routes.js";
import genericRoutes from "./generic.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/tasks", taskRoutes);
router.use("/departments", departmentRoutes);
router.use("/generic", genericRoutes);

export default router;
