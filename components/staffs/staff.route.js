import { Router } from "express";
import { createStaff, getAllStaffs, getSingleStaff, updateStaff } from "./staff.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.route("/")
  .get(permit("admin"), getAllStaffs)
  .post(permit("admin"), createStaff)
router.route("/:id")
  .get(permit("admin"), getSingleStaff)
  .patch(permit("admin"), updateStaff)

export default router
