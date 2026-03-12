const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { usersInDb } = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there is initially some users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const newUser = {
      username: 'testUser',
      name: 'User name',
      password: 'SecretPassword123',
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newUser.password, saltRounds)
    const userWithHash = { ...newUser, passwordHash }
    await User.create(userWithHash)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    assert.strictEqual(response.body.length, 1)
  })

  test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')

    const contents = response.body.map((e) => e.username)
    assert(contents.includes('testUser'))
  })

  test('unique identifier property of the user is named id', async () => {
    const response = await api.get('/api/users')

    response.body.forEach((user) => {
      assert(user.id)
      assert.strictEqual(user._id, undefined)
    })
  })
})

describe('addition of a new user', () => {
  test('a valid user can be added ', async () => {
    const usersBeforePost = await usersInDb()
    const newUser = {
      username: 'addition of a new user',
      name: 'New User',
      password: 'NewPassword123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await usersInDb()
    assert.strictEqual(usersAfterPost.length, usersBeforePost.length + 1)

    const contents = usersAfterPost.map((u) => u.username)
    assert(contents.includes('addition of a new user'))
  })

  test('password less than 3 characters', async () => {
    const usersBeforePost = await usersInDb()
    const newUser = {
      username: 'password less than 3 characters',
      name: 'New User',
      password: 'a1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await usersInDb()
    assert.strictEqual(usersAfterPost.length, usersBeforePost.length)
  })

  test('username must be unique', async () => {
    const usersBeforePost = await usersInDb()
    const newUser = {
      username: 'username must be unique',
      name: 'New User',
      password: 'NewPassword123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAfterPost = await usersInDb()
    assert.strictEqual(usersAfterPost.length, usersBeforePost.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})