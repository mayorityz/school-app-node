import { Router } from "express";
import { changePassword, createStaff, getAllStaffs, getSingleStaff, updateStaff } from "./staff.controller.js";
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = Router()

router.use(authMiddleware)
router.route("/")
  .get(permit("admin"), getAllStaffs)
  .post(permit("admin"), createStaff)
  .patch(permit("admin", "teacher"), changePassword)
router.route("/:id")
  .get(permit("admin"), getSingleStaff)
  .patch(permit("admin"), updateStaff)

export default router
