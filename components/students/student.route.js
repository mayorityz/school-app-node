import express from 'express'
import { changePassword, createStudent, getAllStudents, getSingleStudent } from './student.controller.js'
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = express.Router()

router.use(authMiddleware)
router.route("/")
  .get(permit("admin", "teacher"), getAllStudents)
  .post(permit("admin"), createStudent)
  .patch(changePassword)
router.get("/:paramValue", permit("admin", "teacher"), getSingleStudent)

export default router
