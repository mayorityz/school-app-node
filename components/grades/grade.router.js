import { Router } from 'express'
import {
  createGradeRecord,
  createNewGrade,
  getAllGradeRecord,
  getSingleGradeRecord,
  getStudentGradeByTermSession,
  updateSingleGradeRecord,
} from './grade.controller.js'
import { authMiddleware, permit } from '../../middlewares/auth.js'

const router = Router()

router
  .route('/')
  .get(authMiddleware, getAllGradeRecord)
  .post(authMiddleware, permit('teacher', 'admin'), createNewGrade)

router
  .route('/:id')
  .get(authMiddleware, getSingleGradeRecord)
  .patch(authMiddleware, permit('teacher'), updateSingleGradeRecord)

router.route('/term-grades').post(authMiddleware, getStudentGradeByTermSession)

export default router
