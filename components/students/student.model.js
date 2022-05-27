import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide student's first name"],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "Please provide student's last name"],
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
      required: [true, "Please provide student's date of birth"]
    },
    active: {
      type: Boolean,
      default: true
    },
    password: {
      type: String,
      required: [true, "Please provide password for the student"]
    },
    admissionNumber: {
      type: String,
      required: [true, "Please provide student's admission number"],
    }
  },
  { timestamps: true },
)

export default mongoose.model("Student", StudentSchema)