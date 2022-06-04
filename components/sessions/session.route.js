import { Router } from "express";
import {
  closeSession,
  createSession,
  getAllSessions,
} from "./session.controller.js";
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = Router();

router.use(authMiddleware);
router
  .route("/")
  .post(permit("admin"), createSession)
  .get(permit("admin"), getAllSessions);
router.patch("/:id", permit("admin"), closeSession);

export default router;
