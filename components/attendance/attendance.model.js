import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    term: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Term",
    },
    mark: {
      type: Number,
      default: 0,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    dateLastMarked: {
      type: Date,
    },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === "dev",
  }
);

AttendanceSchema.index({ student: 1, term: -1 }, { unique: true });

export default mongoose.model("Attendance", AttendanceSchema);
