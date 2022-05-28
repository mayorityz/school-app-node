import { Router } from "express";
import { closeSession, createSession } from "./session.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.use(permit("admin"))
router.post("/", createSession)
router.patch("/:id", closeSession)

export default router
