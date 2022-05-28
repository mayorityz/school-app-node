import { Router } from "express";
import { closeTerm, createTerm, openTheDay } from "./term.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.use(permit("admin"))
router.post("/", createTerm)
router.patch("/:id", openTheDay)
router.post("/:id", closeTerm)

export default router
