import { Router } from "express";
import { closeTerm, createTerm, openTheDay } from "./term.controller.js";

const router = Router()

router.post("/", createTerm)
router.patch("/:id", openTheDay)
router.post("/:id", closeTerm)

export default router
