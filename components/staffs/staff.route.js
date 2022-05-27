import { Router } from "express";
import { createStaff, getAllStaffs, getSingleStaff, updateStaff } from "./staff.controller.js";

const router = Router()

router.route("/")
  .get(getAllStaffs)
  .post(createStaff)
router.route("/:id")
  .get(getSingleStaff)
  .patch(updateStaff)

export default router
