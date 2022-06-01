import Subject from "./subject.model.js";

export const createSubject = async (req, res) => {
  const body = req.body;
  const subject = await Subject.create(body);
  res.status(201).json({ subject });
};

export const getAllSubjects = async (req, res) => {
  const { section } = req.query;
  let filter = {};
  if (section) {
    filter.section = section;
  }
  const subjects = await Subject.find(filter);
  res.status(200).json({ subjects });
};
