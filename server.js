import express from 'express'
import _ from "express-async-errors"
import cors from 'cors'
import DB_CONNECTION from './utils/db.js'
import AttendanceRoute from "./components/attendance/attendance.route.js"
import ClassroomRoute from './components/classrooms/classroom.route.js'
import SectionRoute from "./components/sections/section.route.js"
import SessionRoute from "./components/sessions/session.route.js"
import StaffRoute from "./components/staffs/staff.route.js"
import StudentRoute from './components/students/student.route.js'
import SubjectRoute from "./components/subjects/subject.route.js"
import TermRoute from "./components/terms/term.route.js"
import { authMiddleware } from "./middlewares/auth.js"
import { errorHandlerMIddleware } from "./middlewares/error-handler.js"

const app = express()
const PORT = process.env.PORT || 8085
const ROUTE_PATH = '/api/v1'

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(authMiddleware)
app.use(`${ROUTE_PATH}/attendance`, AttendanceRoute)
app.use(`${ROUTE_PATH}/classroom`, ClassroomRoute)
app.use(`${ROUTE_PATH}/section`, SectionRoute)
app.use(`${ROUTE_PATH}/session`, SessionRoute)
app.use(`${ROUTE_PATH}/staff`, StaffRoute)
app.use(`${ROUTE_PATH}/subject`, SubjectRoute)
app.use(`${ROUTE_PATH}/term`, TermRoute)
app.use(`${ROUTE_PATH}/student`, StudentRoute)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// catch server errors and respond with 500
app.use(errorHandlerMIddleware)

try {
  DB_CONNECTION.then(() => {
    console.log('listening')
    app.listen(PORT, () => {
      console.log('connecting DB ...')
      console.log(`running on port ${PORT}`)
    })
  })
} catch (error) {
  console.log(error.message)
  res.status(500).send(error.message)
}
