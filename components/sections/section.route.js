import { Router } from "express";
import { createSection, getAllSections } from "./section.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.use(permit("admin"))
router.route("/")
  .get(getAllSections)
  .post(createSection)

export default router
