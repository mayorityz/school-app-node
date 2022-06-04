import { Router } from "express";
import { closeTerm, createTerm, openTheDay } from "./term.controller.js";
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = Router();

router.use(authMiddleware);
router
  .route("/")
  .post(permit("admin"), createTerm)
  .patch(permit("admin"), openTheDay);
router.post("/:id", permit("admin"), closeTerm);

export default router;
