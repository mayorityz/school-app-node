import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: String,
    admissionNumber: {
      type: String,
      required: true,
    },
    classRoom: String,
    dob: String,
  },
  { timestamps: true },
)
const Students = mongoose.model('students', studentSchema)

export default Students
