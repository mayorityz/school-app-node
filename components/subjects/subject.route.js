import { Router } from 'express'
import {
  createSubject,
  getAllSubjects,
  getSubjectsByClassRoom,
} from './subject.controller.js'
import { authMiddleware, permit } from '../../middlewares/auth.js'

const router = Router()

router.use(authMiddleware)
router.post('/', permit('admin'), createSubject)
router.get('/', permit('admin', 'teacher'), getAllSubjects)
router.get(
  '/classRoomSubject',
  permit('admin', 'teacher'),
  getSubjectsByClassRoom,
)

export default router
