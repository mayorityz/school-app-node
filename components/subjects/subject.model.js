import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const SubjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the subject title"],
    },
    section: {
      type: mongoose.Types.ObjectId,
      ref: "Section",
    },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === "dev",
  }
);

SubjectSchema.index({ title: 1, section: -1 }, { unique: true });

export default mongoose.model("Subject", SubjectSchema);
