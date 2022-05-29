import { Router } from "express";
import { createSection, getAllSections } from "./section.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.route("/")
  .get(permit("admin"), getAllSections)
  .post(permit("admin"), createSection)

export default router
