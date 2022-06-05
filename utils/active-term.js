import Term from "../components/terms/term.model.js";
import { BadRequestError } from "./errors.js";

export const getActiveTerm = async () => {
  const term = await Term.findOne({ status: "active" });
  if (!term) {
    throw new BadRequestError("There is no active term");
  }
  return term;
};
