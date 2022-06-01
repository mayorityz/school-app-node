import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide the title for this classroom"],
      unique: true,
    },
  },
  {
    section: {
      type: mongoose.Types.ObjectId,
      ref: "Section",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Classroom", ClassroomSchema);
