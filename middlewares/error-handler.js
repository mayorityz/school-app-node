import { Error as MongooseError } from "mongoose"
import { CustomHTTPError } from "../utils/errors";

export const errorHandlerMIddleware = (err, req, res, next) => {
    if (err instanceof CustomHTTPError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    if (err instanceof MongooseError.ValidationError) {
        const message = Object.values(err.errors).map(error => error.message).join(", ")
        return res.status(400).json({ message })
    }
    if (err instanceof MongooseError.CastError && err.path === "_id") {
        return res.status(404).json({ message: "No such record found" })
    }
    if (err.code && err.code === 11000) {
        return res.status(400).json({ message: `${Object.keys(err.keyValue)} already exists.` })
    }
    res.status(500).json({ message: "Internal Server Error" })
}