import { Router } from "express";
import { createStaff, getAllStaffs, getSingleStaff, updateStaff } from "./staff.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.use(permit("admin"))
router.route("/")
  .get(getAllStaffs)
  .post(createStaff)
router.route("/:id")
  .get(getSingleStaff)
  .patch(updateStaff)

export default router
