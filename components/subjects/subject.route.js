import { Router } from "express";
import { createSubject, getAllSubjects } from "./subject.controller.js";

const router = Router()

router.post("/", createSubject)
router.get("/", getAllSubjects)

export default router
