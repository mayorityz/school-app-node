import Classroom from "./classroom.model.js";

export const createClassroom = async (req, res) => {
  const body = req.body;
  const classroom = await Classroom.create(body);
  res.status(201).json({ classroom });
};

export const getAllClassrooms = async (req, res) => {
  const { section } = req.query; // allow user filter by section
  let filter = {};
  if (section) {
    filter = { section };
  }
  const classrooms = await Classroom.find(filter);
  res.status(200).json({ classrooms });
};
