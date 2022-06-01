import { Router } from "express";
import {
  createGradeRecord,
  getAllGradeRecord,
  getSingleGradeRecord,
  updateSingleGradeRecord,
} from "./grade.controller.js";
import { authMiddleware, permit } from "../../middlewares/auth.js";

const router = Router();

router
  .route("/")
  .get(authMiddleware, getAllGradeRecord)
  .post(authMiddleware, permit("teacher"), createGradeRecord);
router
  .route("/:id")
  .get(authMiddleware, getSingleGradeRecord)
  .patch(authMiddleware, permit("teacher"), updateSingleGradeRecord);

export default router;
