const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 })

  response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogsRouter.post('/', async (request, response) => {
    
    
    const blog = new Blog(request.body)
    const decodedToken = jwt.verify(request.token, 'SALAISUUS')
    if(!request.token || !decodedToken.id) {
      response.status(401).json({ error: 'token missing or invalid' })
    }

    


    if(!blog.title || !blog.url) {
      response.status(400).end()
    } else {
      const user = await User.findById(decodedToken.id)
      blog.user = user._id
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.json(savedBlog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request,response,next) => {
  const blog = await Blog.findById(request.params.id)
  const personWhoAddedTheBlog = blog.user

  try {
    const personWhoIsDeletingToken = jwt.verify(request.token, 'SALAISUUS').id
  } catch (e) {
    response.status(401).json(
      {error: 'invalid token'}
    )
  }
  const personWhoIsDeletingToken = jwt.verify(request.token, 'SALAISUUS').id

  if(!request.token || !(personWhoAddedTheBlog.toString() === personWhoIsDeletingToken.toString())) {
    response.status(401).json( { error: 'token missing or invalid'})
  } else {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }

})

blogsRouter.put('/:id', async( request,response) => {
  const currentBlog = await Blog.findById(request.params.id)
  const newBlog = currentBlog
  newBlog.likes = request.body.likes
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id,newBlog, { new: true })
  response.json(updatedNote)
})

module.exports = blogsRouter