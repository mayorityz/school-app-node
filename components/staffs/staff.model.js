import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import Term from "../terms/term.model.js";

const StaffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide staff's first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide staff's last name"],
      trim: true,
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Email is invalid",
      },
      unique: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Please provide student's gender"],
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
    },
    dob: {
      type: Date,
      required: [true, "Please provide staff's date of birth"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password for the staff"],
    },
    role: {
      type: String,
      required: [true, "Please provide staff's role"],
      enum: {
        values: ["admin", "teacher"],
        message: "{VALUE} is not an available role",
      },
    },
  },
  { timestamps: true }
);

StaffSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

StaffSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

StaffSchema.methods.generateToken = async function () {
  const term = await Term.findOne({ status: "active" });
  const payload = {
    id: this._id,
    classroom: this.classroom,
    active: this.active,
    role: this.role,
    email: this.email,
    schoolInfo: {
      term: term?._id,
      session: term?.session,
      dateLastOpened: term?.dateLastOpened,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
};

export default mongoose.model("Staff", StaffSchema);
