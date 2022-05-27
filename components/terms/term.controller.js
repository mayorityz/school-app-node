import Term from "./term.model.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import { removeKeysFromObj } from "../../utils/helper.js";

export const createTerm = async (req, res) => {
    const activeTerm = await Term.findOne({ status: "active" })
    if (activeTerm) {
        throw new BadRequestError("Cannot create new term when there is still an active term")
    }
    const body = req.body
    removeKeysFromObj(body, "status", "dateLastOpened")
    const term = await Term.create(body)
    res.status(201).json({ term })
}

export const closeTerm = async (req, res) => {
    const { id } = req.params
    const term = await Term.findByIdAndUpdate(id, { status: "concluded" })
    if (!term) {
        throw new NotFoundError("Term does not exists")
    }
    res.status(200).json({ term })
}

export const openTheDay = async (req, res) => {
    const { id } = req.params
    const term = await Term.findById(id)
    if (!term) {
        throw NotFoundError("Term does not exists")
    }
    term.daysOpened = term.daysOpened + 1
    term.dateLastOpened = new Date()
    await term.save()
}
