import StudentModel from './student.model.js'

export const CreateStudent = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      gender,
      admissionNumber,
      classRoom,
      dob,
    } = req.body

    StudentModel.findOne({ admissionNumber }, async (err, result) => {
      if (result) {
        res
          .status(500)
          .json({ status: 500, message: 'Admission Number Already Exists!' })
      } else {
        let newStudent = new StudentModel({
          firstName,
          lastName,
          gender,
          admissionNumber,
          classRoom,
          dob,
        })
        await newStudent.save()
        res.status(200).json({
          status: 200,
          message: `${firstName} has been added successfully!`,
        })
      }
    })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error!' })
  }
}

export const FetchStudents = async (req, res) => {
  try {
    StudentModel.find({}, (er, results) => {
      if (results) {
        res.status(200).json({
          status: 200,
          message: 'Fetched Successfully!',
          data: results,
        })
      } else {
        res.status(500).json({
          status: 500,
          message: `Error Occured While Fetching`,
        })
      }
    })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error!' })
  }
}

export const fetchByNumber = async (req, res) => {
  try {
    const { admissionNumber } = req.body
    StudentModel.findOne({ admissionNumber }, (er, result) => {
      if (result) {
        res.status(200).json({
          status: 200,
          message: `Successful`,
          data: result,
        })
      }
    })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error!' })
  }
}
