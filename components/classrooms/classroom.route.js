import express from 'express'
import { createClassRoom, fetchAllClassRooms } from './classroom.controller.js'

const Router = express.Router()

Router.post('/new-classroom', createClassRoom)
Router.get('/get-all', fetchAllClassRooms)

export default Router
