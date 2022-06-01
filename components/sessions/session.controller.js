import Session from "./session.model.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import { removeKeysFromObj } from "../../utils/helper.js";

export const createSession = async (req, res) => {
  const activeSession = await Session.findOne({ status: "active" });
  if (activeSession) {
    throw BadRequestError(
      "Cannot create new session if a session is still active"
    );
  }
  const body = req.body;
  removeKeysFromObj(body, "status"); // don't want user to set status. default is active
  const session = await Session.create(body);
  res.status(201).json({ session });
};

export const getAllSessions = async (req, res) => {
  const sessions = await Session.find().populate("terms");
  res.status(200).json({ sessions });
};

export const closeSession = async (req, res) => {
  const { id } = req.params;
  const session = await Session.findById(id).populate("terms");
  if (!session) {
    throw new NotFoundError("Session does not exists");
  }
  if (session.status === "concluded") {
    throw new BadRequestError("Session has already been closed before");
  }
  session.terms.forEach((term) => {
    if (term.status === "active") {
      throw new BadRequestError(
        `${term.title} is still active. Close the term before closing session`
      );
    }
  });
  session.status = "concluded";
  await session.save();
  res.status(200).json({ session });
};
