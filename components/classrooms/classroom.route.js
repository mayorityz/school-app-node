import express from 'express'
import { createClassroom, getAllClassrooms } from './classroom.controller.js'
import { permit } from "../../middlewares/auth.js";

const router = express.Router()

router.post('/', permit("admin"), createClassroom)
router.get('/', permit("admin"), getAllClassrooms)

export default router
