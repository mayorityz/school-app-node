import Section from "./section.model.js";
import { BadRequestError } from "../../utils/errors.js";

export const createSection = async (req, res) => {
  const { title } = req.body;
  const activeSession = await Section.findOne({ status: "active" });
  if (activeSession) {
    throw new BadRequestError(
      "Cannot create new session when there is still an active session"
    );
  }
  const section = await Section.create({ title });
  res.status(201).json({ section });
};

export const getAllSections = async (req, res) => {
  const sections = await Section.find();
  res.status(200).json({ sections });
};
