import mongoose from "mongoose";
import dotenv from "dotenv";
import Session from "../sessions/session.model.js";
import { BadRequestError } from "../../utils/errors.js";

dotenv.config();

const TermSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the term titlel"],
      enum: {
        values: ["first term", "second term", "third term"],
        message: "{VALUE} is not a valid term",
      },
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    daysOpened: {
      type: Number,
      default: 0,
    },
    dateLastOpened: {
      type: Date,
    },
    status: {
      type: String,
      default: "active",
      enum: {
        values: ["active", "concluded"],
        message: "{VALUE} is not valid for status",
      },
    },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === "dev",
  }
);

TermSchema.index({ session: 1, title: -1 }, { unique: true });

TermSchema.pre("save", async function (next) {
  const session = await Session.findOne({
    _id: this.session,
    status: "active",
  });
  if (!session) {
    throw new BadRequestError(
      "The term is being created in a session that is not active"
    );
  }
  next();
});

export default mongoose.model("Term", TermSchema);
