import Section from '../sections/section.model.js'
import subjectModel from './subject.model.js'
import Subject from './subject.model.js'

export const createSubject = async (req, res) => {
  const body = req.body
  const subject = await Subject.create(body)
  res.status(201).json({ subject })
}

export const getAllSubjects = async (req, res) => {
  const { section } = req.query
  let filter = {}
  if (section) {
    filter.section = section
  }
  const subjects = await Subject.find(filter)
  res.status(200).json({ subjects })
}

export const getSubjectsByClassRoom = async (req, res) => {
  let { classroom } = req.user
  //we need to get the section.
  let section = await Section.findOne({ classroom })
  let subjectsInSection = await subjectModel.find({ section }, { title: 1 })

  res.status(200).json({ status: 200, data: subjectsInSection })
}
