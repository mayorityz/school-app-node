import Grade from "./grade.model.js";
import { NotFoundError } from "../../utils/errors.js";
import { removeKeysFromObj } from "../../utils/helper.js";

export const createGradeRecord = async (req, res) => {
  const body = req.body;
  removeKeysFromObj(body, "classroom");
  const grade = await Grade.create({ ...body, classroom: req.user.classroom });
  res.status(201).json({ grade });
};

export const getAllGradeRecord = async (req, res) => {
  const { classroom, term, student } = req.query;
  let filter = {};
  if (classroom) filter.classroom = classroom;
  if (term) filter.term = term;
  if (student) filter.student = student;
  if (req.user.admissionNumber) filter.student = req.user.id;
  if (req.user.role !== "admin") filter.classroom = req.user.classroom;
  const grades = await Grade.find(filter);
  res.status(200).json({ grades });
};

export const getSingleGradeRecord = async (req, res) => {
  const { id } = req.params;
  let filter = { _id: id };
  if (req.user.role !== "admin") filter.classroom = req.user.classroom;
  const grade = await Grade.findOne(filter);
  if (!grade) {
    throw new NotFoundError("Record does not exists");
  }
  res.status(200).json({ grade });
};

export const updateSingleGradeRecord = async (req, res) => {
  const { id } = req.params;
  const { grades } = req.body;
  const grade = await Grade.findOne({ _id: id, classroom: req.user.classroom });
  if (!grade) {
    throw new NotFoundError("Record does not exists");
  }
  grade.grades = grades;
  await grade.save();
};
