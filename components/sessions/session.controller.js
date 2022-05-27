import Session from "./session.model.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import { excludeKeysFromObj } from "../../utils/helper.js";

export const createSession = async (req, res) => {
    const activeSession = await Session.findOne({ status: "active" })
    if (activeSession) {
        throw BadRequestError("Cannot create new session if a session is still active")
    }
    const body = req.body
    excludeKeysFromObj(body, "status") // don't want user to set status. default is active
    const session = await Session.create(body)
    res.status(201).json({ session })
}

export const closeSession = async (req, res) => {
    const { id } = req.params
    const session = await Session.findByIdAndUpdate(id, { status: "concluded" }, {
        new: true,
        runValidators: true
    })
    if (!session) {
        throw new NotFoundError("Session does not exists")
    }
    res.status(200).json({ session })
}
