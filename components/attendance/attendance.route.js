import { Router } from "express";
import { markAttendance } from "./attendance.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.post("/", permit("teacher"), markAttendance)

export default router
