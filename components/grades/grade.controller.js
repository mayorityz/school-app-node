import Grade, { newGradeModel } from './grade.model.js'
import { NotFoundError } from '../../utils/errors.js'
import { removeKeysFromObj } from '../../utils/helper.js'
import termModel from '../terms/term.model.js'
import sessionModel from '../sessions/session.model.js'

export const createGradeRecord = async (req, res) => {
  const body = req.body
  removeKeysFromObj(body, 'classroom')
  const grade = await Grade.create({ ...body, classroom: req.user.classroom })
  res.status(201).json({ grade })
}

export const getAllGradeRecord = async (req, res) => {
  const { classroom, term, student } = req.query
  let filter = {}
  if (classroom) filter.classroom = classroom
  if (term) filter.term = term
  if (student) filter.student = student
  if (req.user.admissionNumber) filter.student = req.user.id
  if (req.user.role !== 'admin') filter.classroom = req.user.classroom
  const grades = await Grade.find(filter)
  res.status(200).json({ grades })
}

export const getSingleGradeRecord = async (req, res) => {
  const { id } = req.params
  let filter = { _id: id }
  if (req.user.role !== 'admin') filter.classroom = req.user.classroom
  const grade = await Grade.findOne(filter)
  if (!grade) {
    throw new NotFoundError('Record does not exists')
  }
  res.status(200).json({ grade })
}

export const updateSingleGradeRecord = async (req, res) => {
  const { id } = req.params
  const { grades } = req.body
  const grade = await Grade.findOne({ _id: id, classroom: req.user.classroom })
  if (!grade) {
    throw new NotFoundError('Record does not exists')
  }
  grade.grades = grades
  await grade.save()
}

export const createNewGrade = async (req, res) => {
  try {
    let { student, ca, exam, subject } = req.body
    let { classroom } = req.user
    // get the active session and active term
    let term = await termModel.findOne({ status: 'active' }, { title: 1 })
    if (!term)
      return res
        .status(200)
        .json({ status: 200, message: 'no active term setup!' })
    let session = await sessionModel.findOne({ status: 'active' }, { title: 1 })
    if (!session)
      return res
        .status(200)
        .json({ status: 200, message: 'no active academic session setup!' })

    let data = {
      student,
      ca,
      exam,
      subject,
      session: session._id,
      classroom,
      term: term.title,
    }

    let check = await newGradeModel.findOne({
      student,
      subject,
      term: term.title,
      session: session._id,
    })

    if (!check) {
      await newGradeModel.create(data)
      res.status(200).json({
        status: 200,
        message: 'Grade saved successfully!',
      })
    } else {
      res.status(200).json({
        status: 201,
        message: `This student has already had a score set here for ${subject}!`,
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = []

      Object.keys(error.errors).forEach((key) => {
        errors.push({
          field: error.errors[key].path,
          message: error.errors[key].message,
        })
      })

      return res
        .status(400)
        .json({ status: 400, message: 'validation error', errors })
    }
    console.log(error)
    res.status(500).json({ message: 'internal server error!' })
  }
}

/**
 * get each students grade according to the current term and session
 */
export const getStudentGradeByTermSession = async (req, res) => {
  try {
    let { student } = req.body
    let { classroom } = req.user

    let term = await termModel.findOne({ status: 'active' }, { title: 1 })
    if (!term)
      return res
        .status(200)
        .json({ status: 200, message: 'no active term setup!' })
    let session = await sessionModel.findOne({ status: 'active' }, { title: 1 })
    if (!session)
      return res
        .status(200)
        .json({ status: 200, message: 'no active academic session setup!' })

    let grades = await newGradeModel.find({
      student,
      term: term.title,
      session: session._id,
      classroom,
    })

    res.status(200).json({ grades })
  } catch (error) {
    console.log(error)
  }
}
