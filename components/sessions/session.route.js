import { Router } from "express";
import { closeSession, createSession } from "./session.controller.js";

const router = Router()

router.post("/", createSession)
router.patch("/:id", closeSession)

export default router
