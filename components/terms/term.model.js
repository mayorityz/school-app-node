import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const TermSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide the term title'],
      enum: {
        values: ['first term', 'second term', 'third term'],
        message: '{VALUE} is not a valid term',
      },
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
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
      default: 'active',
      enum: {
        values: ['active', 'concluded'],
        message: '{VALUE} is not valid for status',
      },
    },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV === 'dev',
  },
)

TermSchema.index({ session: 1, title: -1 }, { unique: true })

export default mongoose.model('Term', TermSchema)
