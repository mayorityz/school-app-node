import Student from "./student.model.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthenticatedError,
} from "../../utils/errors.js";
import { removeKeysFromObj } from "../../utils/helper.js";

export const createStudent = async (req, res) => {
  const body = req.body;
  let student = await Student.create(body);
  student = student.toObject();
  removeKeysFromObj(student, "password");
  res.status(201).json({ student });
};

export const getAllStudents = async (req, res) => {
  const { classroom } = req.query;
  let filter = {};
  // admin can optionally filter by classroom
  // but a teacher's request will be filtered by classroom
  if (classroom) {
    filter.classroom = classroom;
  }
  if (req.user.role === "teacher") {
    filter.classroom = req.user.classroom;
  }
  const students = await Student.find(filter).select("-password");
  res.status(200).json({ students });
};

export const getSingleStudent = async (req, res) => {
  const { paramValue } = req.params;
  const { field } = req.query;
  if (!field) {
    throw new BadRequestError("Field was not specified");
  }
  if (!["id", "admission-number"].includes(field)) {
    throw new BadRequestError(
      `${field} is not a valid field. Expected one of id or admission-number`
    );
  }
  let filter = {};
  const key = field === "id" ? "_id" : "admissionNumber";
  filter[key] = paramValue;
  if (req.user.role === "teacher") {
    filter.classroom = req.user.classroom;
  }
  const student = await Student.findOne(filter).select("-password");
  if (!student) {
    throw new NotFoundError("Student does not exists");
  }
  res.status(200).json({ student });
};

export const changePassword = async (req, res) => {
  if (req.user.role) {
    throw new ForbiddenError("User is not a student");
  }
  const { oldPassword, newPassword } = req.body;
  const student = await Student.findById(req.user.id);
  if (!student) {
    throw new NotFoundError("Student does not exists");
  }
  const passwordMatch = await student.comparePassword(oldPassword);
  if (!passwordMatch) {
    throw new BadRequestError("Invalid credentials");
  }
  student.password = newPassword;
  await student.save();
  res.status(200).json({ message: "Password updated successfully" });
};

export const login = async (req, res) => {
  const { admissionNumber, password } = req.body;
  const student = await Student.findOne({ admissionNumber });
  if (!student) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  if (!student.active) {
    throw new UnauthenticatedError("User has been deactivated");
  }
  const passwordMatch = await student.comparePassword(password);
  if (!passwordMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = await student.generateToken();
  res.status(200).json({ token });
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  removeKeysFromObj(body, "admissionNumber", "password");
  const student = await Student.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ student });
};
