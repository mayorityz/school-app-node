import sessionModel from '../sessions/session.model.js'
import termModel from '../terms/term.model.js'
import commentModel from './comment.model.js'

export const createComment = async (req, res) => {
  try {
    let { comment, student } = req.body
    let { role } = req.user

    // find if the role has been filed.

    let session = await sessionModel.findOne({ status: 'active' }, { title: 1 })

    if (!session) {
      return res.status(500).json({ message: 'Session hasnt been set!' })
    }

    let term = await termModel.findOne({ status: 'active' }, { title: 1 })

    if (!term) {
      return res.status(500).json({ message: 'Term hasnt been set!' })
    }

    let find = await commentModel.findOne({
      student,
      role,
      session: session.title,
    })
    console.log(find)

    if (!find) {
      await commentModel.create({
        comment,
        student,
        staff: role,
        session: session.title,
        term: term.title,
      })

      res.status(200).json({ status: 200, message: 'Comment saved!' })
    } else {
      res.status(500).json({ status: 500, message: 'Comment has been added!' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: 'Internal Server Error.' })
  }
}

export const getComment = async (req, res) => {
  try {
    let { student } = req.body
    let { role } = req.user

    let session = await sessionModel.findOne({ status: 'active' }, { title: 1 })

    if (!session) {
      return res.status(500).json({ message: 'Session hasnt been set!' })
    }

    let term = await termModel.findOne({ status: 'active' }, { title: 1 })

    if (!term) {
      return res.status(500).json({ message: 'Term hasnt been set!' })
    }

    let find = await commentModel.findOne(
      {
        student,
        session: session.title,
        term: term.title,
        role,
      },
      { comment: 1 },
    )
    if (find) res.status(200).json({ comment: find.comment })
    else {
      res.status(200).json({ message: null })
    }
  } catch (error) {
    res.status(500).json({ message: 'internal server error.' })
  }
}
