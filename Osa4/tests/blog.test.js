const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelpers = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async() => {
    await Blog.deleteMany({})
    console.log('deleted starting blogs')

    const blogObjects = testHelpers.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(
        blog => blog.save())
        
    await Promise.all(promiseArray)
    console.log('all initial blogs saved')
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('you get right amount of blogs', async () => {
    const blogsAtStart = await testHelpers.blogsInDb()
    expect(blogsAtStart).toHaveLength(6)
})

test('id field key is id', async() => {
    const blogsAtStart = await testHelpers.blogsInDb()
    blogsAtStart.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('you can add blogs with POST', async() => {
    const blogsAtStart = await testHelpers.blogsInDb()
    await api
        .post('/api/blogs')
        .send({ title: "Tyrgespe wars", author: "Rgressegrobert C. Martin", url: "http://blog.cleangresegrs.com/uncle-bob/2016/05/01/TypeWars.html", likes: 5, __v: 0 })
    const blogsAtEnd = await testHelpers.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
})

test('if you dont give value to likes it get set to 0', async() => {
    const testBlog = { title: "ugauga", author: "juupajuu", url: "http://testiurli.com"}
    const newBlog = new Blog(testBlog)
    console.log(newBlog)
    expect(newBlog.likes).toBe(0)

})

test('if you dont send title and url server responds with 404', async() => {
    const testBlog = { author: "jupelisjuu" }
    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})


// const response = await api.get('/api/blogs')