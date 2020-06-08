const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async( request, response, next ) => {
    const body = request.body
    const currentUser = await User.find(body.userId)

    if(body.password.length < 3 || !body.password) {
        console.log('too short password')
        response.status(400).json({error: 'you need to have password and it need to be atleast 3 characters long'})
    } else {

    /*if(currentUsers.find(users => users.name == body.name)) {
        console.log('username already in db')
        response.status(400).end()
    }*/

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username : body.username,
        name: body.name,
        passwordHash
    })
    
    const savedUser = await user.save()
        .catch(error => next(error))
        

    response.json(savedUser)
    
    }
})

usersRouter.get('/', async ( request, response) => {
    const users = await User.find({}).populate('blogs', { url:1, title: 1, author: 1})
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter