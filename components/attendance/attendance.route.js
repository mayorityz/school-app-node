import { Router } from "express";
import { markAttendance } from "./attendance.controller.js";
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = Router();

router.use(authMiddleware);
router.post("/", permit("teacher"), markAttendance);

export default router;
