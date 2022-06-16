import { Router } from 'express'
import {
  changePassword,
  createStaff,
  createStaffAuth,
  getAllStaffs,
  getSingleStaff,
  login,
  updateStaff,
} from './staff.controller.js'
import { authMiddleware, permit } from '../../middlewares/auth.js'

const router = Router()

// public route
router.post('/login', login)
router.route('/create-admin').post(createStaffAuth)

router.use(authMiddleware)
router
  .route('/')
  .get(permit('admin', 'teacher'), getAllStaffs)
  .post(permit('admin'), createStaff)
  .patch(permit('admin', 'teacher'), changePassword)

router
  .route('/:id')
  .get(permit('admin'), getSingleStaff)
  .patch(permit('admin'), updateStaff)

export default router
