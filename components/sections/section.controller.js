import Section from "./section.model.js";
import { } from "../../utils/errors.js";

export const createSection = async (req, res) => {
    const body = req.body
    const section = await Section.create(body)
    res.status(201).json({ section })
}

export const getAllSections = async (req, res) => {
    const sections = await Section.find()
    res.status(200).json({ sections })
}
