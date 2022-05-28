import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthenticatedError } from "../utils/errors.js";

export const authMiddleware = (req, res) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
    } catch (error) {
        throw new UnauthenticatedError("Not authenticated")
    }
}

export const permit = (...roles) => {
    return (req, res, next) => {
        const { role } = req.user
        if (!roles.includes(role)) {
            throw new ForbiddenError("Not allowed to perform this action")
        }
        next()
    }
}
