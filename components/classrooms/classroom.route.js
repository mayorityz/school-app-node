import express from 'express'
import { createClassroom, getAllClassrooms } from './classroom.controller.js'
import { permit } from "../../middlewares/auth.js";

const router = express.Router()

router.use(permit("admin"))
router.post('/', createClassroom)
router.get('/', getAllClassrooms)

export default router
