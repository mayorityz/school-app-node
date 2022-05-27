import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const GradeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Types.ObjectId,
            ref: "Student"
        },
        subject: {
            type: mongoose.Types.ObjectId,
            ref: "Subject"
        },
        term: {
            type: mongoose.Types.ObjectId,
            ref: "Term"
        },
        classroom: {
            type: mongoose.Types.ObjectId,
            ref: "Classroom"
        },
        score: {
            type: Number,
            max: [100, "Score cannot be more than 100"],
            min: [0, "Score cannot be less than 0"],
            required: [true, "Please provide student score"]
        }
    },
    {
        timestamps: true,
        autoIndex: process.env.NODE_ENV === "dev"
    }
)

GradeSchema.index({ student: 1, term: -1 }, { unique: true })

export default mongoose.model("Grade", GradeSchema)