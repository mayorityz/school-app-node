import express from 'express'
import { createClassroom, getAllClassrooms } from './classroom.controller.js'

const router = express.Router()

router.post('/', createClassroom)
router.get('/', getAllClassrooms)

export default router
