import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Term from "../terms/term.model.js";

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide student's first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide student's last name"],
      trim: true,
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
      type: mongoose.Types.ObjectId,
      ref: "Classroom",
    },
    dob: {
      type: Date,
      required: [true, "Please provide student's date of birth"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password for the student"],
    },
    admissionNumber: {
      type: String,
      required: [true, "Please provide student's admission number"],
      unique: true,
    },
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

StudentSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

StudentSchema.methods.generateToken = async function () {
  const term = await Term.findOne({ status: "active" });
  const payload = {
    id: this._id,
    classroom: this.classroom,
    active: this.active,
    admissionNumber: this.admissionNumber,
    schoolInfo: {
      term: term?._id,
      session: term?.session,
      dateLastOpened: term?.dateLastOpened,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
};

export default mongoose.model("Student", StudentSchema);
