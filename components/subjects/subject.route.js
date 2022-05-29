import { Router } from "express";
import { createSubject, getAllSubjects } from "./subject.controller.js";
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = Router()

router.use(authMiddleware)
router.post("/", permit("admin"), createSubject)
router.get("/", permit("admin", "teacher"), getAllSubjects)

export default router
