const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const phonesRouter = require('./controllers/phones')

mongoose.set('strictQuery',false)

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        logger.info('Connected to MongoDB')
    })
    .catch((error)=>{
        logger.error('error connecting to MongoDB: ',error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/phones',phonesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app