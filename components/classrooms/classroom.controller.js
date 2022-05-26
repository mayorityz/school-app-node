import ClassRoom from './classroom.model.js'

export const createClassRoom = async (req, res) => {
  try {
    let { title } = req.body
    if (!title) {
      return res
        .status(500)
        .json({ status: 500, message: 'Class Room Title Not Supplied!' })
    }

    ClassRoom.findOne({ title }, async (err, result) => {
      if (result) {
        res
          .status(500)
          .json({ status: 500, message: 'Class Room already exists!' })
      } else {
        let newClassRoom = new ClassRoom({ title })
        await newClassRoom.save()
        res.status(200).json({ status: 200, message: 'Class Room Created' })
      }
    })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error!' })
  }
}

export const fetchAllClassRooms = async (req, res) => {
  try {
    ClassRoom.find({}, (er, data) => {
      if (er) {
        res.status(500).json({ status: 500, message: 'No Class Room exists!' })
      } else {
        res.status(200).json({ status: 200, message: 'Fetched', data })
      }
    })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error!' })
  }
}
