import { Router } from "express";
import { closeTerm, createTerm } from "./term.controller.js";

const router = Router()

router.post("/", createTerm)
router.patch("/:id", closeTerm)

export default router
