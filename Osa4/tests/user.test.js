const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelpers = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')



describe('when there is initially one user at db', () => {
// Clearing database
    beforeEach(async() => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'superUser', passwordHash})
        await user.save()

        

    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await testHelpers.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            
            const usersAtEnd = await testHelpers.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
    })

    test('you cant create user if the name already excists in database', async() => {
        const newUser = { username: 'root', name: 'superuser2', password: 'salainen' }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({"error": 'username already in use'})
    })

    test('you cant create new user with password with less than 3 characters', async() => {
        const newUser= { username: 'testuser222', name: 'weafpi', password: 'er'}

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect({"error":"you need to have password and it need to be atleast 3 characters long"})
    })


})

afterAll(() => {
    mongoose.connection.close()
})
