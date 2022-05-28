import { Router } from "express";
import { createSubject, getAllSubjects } from "./subject.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router()

router.post("/", permit("admin"), createSubject)
router.get("/", permit("admin", "teacher"), getAllSubjects)

export default router
