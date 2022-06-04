import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const GradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    term: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Term",
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    grades: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
        score: {
          type: Number,
          required: [true, "Please provide the grade score"],
          min: [0, "Score cannot be less than 0"],
          max: [100, "Score cannot be greater than 100"],
        },
      },
    ],
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === "dev",
  }
);

GradeSchema.index({ student: 1, term: -1 }, { unique: true });

export default mongoose.model("Grade", GradeSchema);
