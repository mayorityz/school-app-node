import express from 'express'
import { createStudent, getAllStudents, getSingleStudent } from './student.controller.js'
import { permit } from "../../middlewares/auth.js";

const router = express.Router()

router.post("/", permit("admin"), createStudent)
router.get("/", permit("admin", "teacher"), getAllStudents)
router.get("/:paramValue", permit("admin", "teacher"), getSingleStudent)

export default router
