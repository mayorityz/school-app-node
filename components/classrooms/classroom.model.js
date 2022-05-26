import mongoose from 'mongoose'

const classRoomSchema = new mongoose.Schema(
  {
    title: String,
  },
  { timestamps: true },
)
const ClassRoom = mongoose.model('classroom', classRoomSchema)

export default ClassRoom
