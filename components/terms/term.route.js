import { Router } from "express";
import { closeTerm, createTerm, openTheDay } from "./term.controller.js";
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = Router()

router.use(authMiddleware)
router.post("/", permit("admin"), createTerm)
router.patch("/:id", permit("admin"), openTheDay)
router.post("/:id", permit("admin"), closeTerm)

export default router
