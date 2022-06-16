import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      required: true,
    },
    staff: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
export default mongoose.model('Comment', CommentSchema)
