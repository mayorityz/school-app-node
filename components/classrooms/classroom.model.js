import mongoose from 'mongoose'

const ClassroomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide the title for this classroom'],
      unique: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sections',
      required: [true, 'A section must be selected.'],
    },
  },
  { timestamps: true },
)

export default mongoose.model('Classroom', ClassroomSchema)
