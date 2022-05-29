import Student from './student.model.js';
import { BadRequestError, NotFoundError } from "../../utils/errors.js";

export const createStudent = async (req, res) => {
  const body = req.body
  const student = await Student.create(body)
  res.status(201).json({ student })
}

export const getAllStudents = async (req, res) => {
  const { classroom } = req.query
  let filter = {}
  // admin can optionally filter by classroom
  // but a teacher's request will be filtered by classroom
  if (classroom) {
    filter.classroom = classroom
  }
  if (req.user.role === "teacher") {
    filter.classroom = req.user.classroom
  }
  const students = await Student.find(filter).select("-password")
  res.status(200).json({ students })
}

export const getSingleStudent = async (req, res) => {
  const { paramValue } = req.param
  const { field } = req.query
  if (!field) {
    throw new BadRequestError("Field was not specified")
  }
  if (!["id", "admission-number"].includes(field)) {
    throw new BadRequestError(`${field} is not a valid field. Expected one of id or admission-number`)
  }
  let filter = {}
  const key = field === "id" ? "_id" : "admissionNumber"
  filter[key] = paramValue
  if (req.user.role === "teacher") {
    filter.classroom = req.user.classroom
  }
  const student = await Student.findOne(filter).select("-password")
  if (!student) {
    throw new NotFoundError("Student does not exists")
  }
  res.status(200).json({ student })
}
