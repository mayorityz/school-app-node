import express from 'express'
import { createClassroom, getAllClassrooms } from './classroom.controller.js'

const Router = express.Router()

Router.post('/', createClassroom)
Router.get('/get-all', getAllClassrooms)

export default Router
