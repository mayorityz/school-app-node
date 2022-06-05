import Term from "./term.model.js";
import { BadRequestError } from "../../utils/errors.js";
import { isToday } from "../../utils/time.js";
import { getActiveTerm } from "../../utils/active-term.js";

export const createTerm = async (req, res) => {
  const activeTerm = await Term.findOne({ status: "active" });
  if (activeTerm) {
    throw new BadRequestError(
      "Cannot create new term when there is still an active term"
    );
  }
  const { title, session, daysOpened } = req.body;
  const term = await Term.create({
    title,
    session,
    daysOpened: daysOpened || 0,
  });
  res.status(201).json({ term });
};

export const closeTerm = async (req, res) => {
  const term = await getActiveTerm();
  term.status = "concluded";
  await term.save();
  res.status(200).json({ term });
};

export const openTheDay = async (req, res) => {
  const term = await getActiveTerm();
  if (isToday(term.dateLastOpened)) {
    throw new BadRequestError("Day already opened");
  }
  term.daysOpened = term.daysOpened + 1;
  term.dateLastOpened = new Date();
  await term.save();
  res.status(200).json({ term });
};
