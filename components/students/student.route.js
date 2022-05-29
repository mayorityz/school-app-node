import express from 'express'
import { changePassword, createStudent, getAllStudents, getSingleStudent } from './student.controller.js'
import { permit } from "../../middlewares/auth.js";

const router = express.Router()

router.route("/")
  .get(permit("admin", "teacher"), getAllStudents)
  .post(permit("admin"), createStudent)
  .patch(changePassword)
router.get("/:paramValue", permit("admin", "teacher"), getSingleStudent)

export default router
