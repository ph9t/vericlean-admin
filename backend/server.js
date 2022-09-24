const express = require('express')

const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware.js')

const connectDB = require('./config/database.js')
const port = process.env.PORT 

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tasks', require('./routes/taskRoutes.js'))
app.use('/api/cleaners', require('./routes/cleanerRoutes.js'))
app.use('/api/heads', require('./routes/headRoutes.js'))
app.use('/api/rtc', require('./routes/rtcRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))