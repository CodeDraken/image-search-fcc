const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const { mongoURI } = require('./config/db.config')

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, { useMongoClient: true }, () => {
  console.log(`Connected to MongoDB at: ${mongoURI}`)
})

const app = express()

// 3rd party middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))

// routes
app.use(require('./routes/urlRoutes'))

// require('./routes/urlRoutes')(app)

module.exports = app
