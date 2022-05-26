import express from 'express'
import {
  CreateStudent,
  FetchStudents,
  fetchByNumber,
} from './student.controller.js'

const Router = express.Router()

Router.post('/new-student', CreateStudent)
Router.get('/fetch-student', FetchStudents)
Router.post('/studentByNumber', fetchByNumber)

export default Router
