import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

var DB_POOL = process.env.NODE_ENV
  ? process.env.REMOTE_DB
  : process.env.LOCAL_DB

let connection

try {
  connection = mongoose.connect(DB_POOL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
} catch (error) {
  console.log(error)
}

export default connection
