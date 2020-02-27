const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const notesRouter = require('./controllers/notes')



console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
  })

app.use(bodyParser.json())
app.use(cors())
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301))
app.use(express.static(path.join(__dirname, 'build')))


app.use('/api/notes', notesRouter)


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app