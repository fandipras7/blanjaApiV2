require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mainRoute = require('./src/routes/index')
const helmet = require('helmet')
const path = require('path')
const xss = require('xss-clean')

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(
  helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })
)

app.use(xss())

// route
app.use('/v1', mainRoute)

app.use('/img', express.static(path.join(__dirname, '/imgUpload')))
app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

// error handling
app.use((err, req, res, next) => {
  let messError = err.message || 'Internal Server Error'
  if (err.message === 'File too large') {
    messError = 'Maximale size 2 mb'
  }
  if (err.message === 'Cannot read property \'filename\' of undefined') {
    console.log(err)
  }
  const statusCode = err.status || 500
  res.status(statusCode).json({
    message: messError
  })
})

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})
