import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

var DB_POOL =
  process.env.NODE_ENV === 'production'
    ? process.env.REMOTE_DB
    : process.env.LOCAL_DB

let connection

try {
  connection = mongoose.connect(DB_POOL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
} catch (error) {
  console.log('error here!')
  console.log(error)
}

export default connection
