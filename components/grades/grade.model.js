import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const GradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    term: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Term',
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
    },
    grades: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subject',
        },
        score: {
          type: Number,
          required: [true, 'Please provide the grade score'],
          min: [0, 'Score cannot be less than 0'],
          max: [60, 'Score cannot be greater than 60'],
        },
      },
    ],
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === 'dev',
  },
)

const newGradeSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      ref: 'Students',
    },
    term: {
      type: String,
      ref: 'term',
      enum: {
        values: ['first term', 'second term', 'third term'],
        message: '{VALUE} is not valid for term',
      },
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'classroom',
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'session',
    },
    ca: {
      type: Number,
      required: [true, 'CA is required'],
      min: [0, 'You can not put a value below 0'],
      max: [40, 'You can not put a value above 40'],
    },
    exam: {
      type: Number,
      required: [true, 'CA is required'],
      min: [0, 'You can not put a value below 0'],
      max: [60, 'You can not put a value above 60'],
    },
    subject: {
      type: String,
      required: [true, 'You must enter the proper subject title'],
    },
  },
  { timestamps: true },
)

GradeSchema.index({ student: 1, term: -1 }, { unique: true })

export default mongoose.model('Grade', GradeSchema)
export const newGradeModel = mongoose.model('newGrades', newGradeSchema)
