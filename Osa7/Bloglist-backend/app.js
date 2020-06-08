const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())



const errorHandler = (error, request, response, next) => {
    console.log('täh')
    console.log(error)
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: 'username already in use'})
    } else if( error.name == 'JsonWebTokenError'){
        return response.status(401).json({
            error: 'invalid tokeni'
        })
    }


    next(error)
}

app.use(errorHandler)

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    next()
}

app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



module.exports = app
