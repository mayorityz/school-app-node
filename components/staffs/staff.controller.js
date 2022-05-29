import Staff from "./staff.model.js";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../../utils/errors.js";
import { removeKeysFromObj } from "../../utils/helper.js";

const staffNotFoundError = new NotFoundError("No such staff exists")

export const getAllStaffs = async (req, res) => {
    const staffs = await Staff.find().select("-password")
    res.status(200).json({ staffs })
}

export const createStaff = async (req, res) => {
    const body = req.body
    const staff = await Staff.create(body)
    const token = await staff.generateToken()
    res.status(201).json({ token })
}

export const updateStaff = async (req, res) => {
    const body = req.body
    removeKeysFromObj(body, "password", "email")
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

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const staff = await Staff.findById(req.user.id)
    if (!staff) {
        throw staffNotFoundError
    }
    const passwordMatch = await staff.confirmPassword(oldPassword)
    if (!passwordMatch) {
        throw new BadRequestError("Invalid credentials")
    }
    staff.password = newPassword
    await staff.save()
    res.status(200).json({ message: "Password updated successfully" })
}

export const login = async (req, res) => {
    const { email, password } = req.body
    const staff = await Staff.findOne({ email })
    if (!staff) {
        throw new UnauthenticatedError("Invalid credentials")
    }
    const passwordMatch = await staff.confirmPassword(password)
    if (!passwordMatch) {
        throw new UnauthenticatedError("Invalid credentials")
    }
    const token = user.generateToken()
    res.status(200).json({ token })
}
