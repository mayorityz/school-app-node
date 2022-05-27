import Staff from "./staff.model.js";
import { NotFoundError } from "../../utils/errors.js";
import { excludeKeysFromObj } from "../../utils/helper.js";

const staffNotFoundError = new NotFoundError("No such staff exists")

export const getAllStaffs = async (req, res) => {
    const staffs = await Staff.find().select("-password")
    res.status(200).json({ staffs })
}

export const createStaff = async (req, res) => {
    const body = req.body
    const staff = await Staff.create(body)
    res.status(201).json({ staff })
}

export const updateStaff = async (req, res) => {
    const body = req.body
    excludeKeysFromObj(body, "password") // admin shouldn't update a staff's password
    const staff = await Staff.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })
    if (!staff) {
        throw staffNotFoundError
    }
    res.status(200).json({ staff })
}

export const getSingleStaff = async (req, res) => {
    const { id } = req.params
    const staff = await Staff.findById(id).select("-password")
    if (!staff) {
        throw staffNotFoundError
    }
    res.status(200).json({ staff })
}
