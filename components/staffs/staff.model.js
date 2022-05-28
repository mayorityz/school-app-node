import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const StaffSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide staff's first name"],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, "Please provide staff's last name"],
            trim: true
        },
        gender: {
            type: String,
            enum: {
                values: ["male", "female"],
                message: "{VALUE} is not a valid gender"
            },
            required: [true, "Please provide student's gender"]
        },
        classroom: {
            type: mongoose.Types.ObjectId,
            ref: "Classroom"
        },
        dob: {
            type: Date,
            required: [true, "Please provide staff's date of birth"],
        },
        active: {
            type: Boolean,
            default: true
        },
        password: {
            type: String,
            required: [true, "Please provide password for the staff"]
        },
        role: {
            type: String,
            required: [true, "Please provide staff's role"],
            enum: {
                values: ["admin", "teacher"],
                message: "{VALUE} is not an available role"
            }
        }
    },
    { timestamps: true }
)

StaffSchema.methods.generateToken = function () {
    const payload = {
        id: this._id,
        classroom: this.classroom,
        active: this.active,
        role: this.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" })
}

export default mongoose.model("Staff", StaffSchema)