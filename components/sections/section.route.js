import { Router } from "express";
import { createSection, getAllSections } from "./section.controller.js";

const router = Router()

router.route("/")
  .get(getAllSections)
  .post(createSection)

export default router
