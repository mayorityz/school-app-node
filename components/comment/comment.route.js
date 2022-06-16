import { Router } from 'express'
import { authMiddleware, permit } from '../../middlewares/auth.js'
import { createComment, getComment } from './comment.controller.js'

const router = Router()
router
  .route('/')
  .post(authMiddleware, permit('teacher', 'admin'), createComment)

router
  .route('/getComment')
  .post(authMiddleware, permit('teacher', 'admin'), getComment)

export default router
