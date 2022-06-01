import { Router } from "express";
import { closeSession, createSession } from "./session.controller.js";
import { permit } from "../../middlewares/auth.js";

const router = Router();

router.post("/", permit("admin"), createSession);
router.patch("/:id", permit("admin"), closeSession);

export default router;
