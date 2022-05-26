import express from 'express'
import cors from 'cors'
import DB_CONNECTION from './utils/db.js'
import ClassRoomRoute from './components/classrooms/classroom.route.js'
import StudentRoute from './components/students/student.route.js'

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

app.use(`${ROUTE_PATH}/classroom`, ClassRoomRoute)
app.use(`${ROUTE_PATH}/student`, StudentRoute)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// catch server errors and respond with 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

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
