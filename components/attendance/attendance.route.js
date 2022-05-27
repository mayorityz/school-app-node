import { Router } from "express";
import { markAttendance } from "./attendance.controller.js";

const router = Router()

router.post("/", markAttendance)

export default router
