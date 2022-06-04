import Term from "./term.model.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import { removeKeysFromObj } from "../../utils/helper.js";
import { isToday } from "../../utils/time.js";

export const createTerm = async (req, res) => {
  const activeTerm = await Term.findOne({ status: "active" });
  if (activeTerm) {
    throw new BadRequestError(
      "Cannot create new term when there is still an active term"
    );
  }
  const body = req.body;
  removeKeysFromObj(body, "status", "dateLastOpened");
  const term = await Term.create(body);
  res.status(201).json({ term });
};

export const closeTerm = async (req, res) => {
  const { id } = req.params;
  const term = await Term.findById(id);
  if (!term) {
    throw new NotFoundError("Term does not exists");
  }
  if (term.status === "concluded") {
    throw new BadRequestError("Term has already been closed");
  }
  term.status = "concluded";
  await term.save();
  res.status(200).json({ term });
};

export const openTheDay = async (req, res) => {
  const term = await Term.findOne({ status: "active" });
  if (!term) {
    throw new NotFoundError("There is no active term.");
  }
  if (isToday(term.dateLastOpened)) {
    throw new BadRequestError("Day already opened");
  }
  term.daysOpened = term.daysOpened + 1;
  term.dateLastOpened = new Date();
  await term.save();
  res.status(200).json({ term });
};
