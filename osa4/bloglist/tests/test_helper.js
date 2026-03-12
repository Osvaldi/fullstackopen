const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const logInTestUser = async () => {
  const testUser = {
    username: 'testusername',
    password: 'testpassword123',
    name: 'Test User'
  }

  await api.post('/api/users').send(testUser)

  const loginResponse = await api.post('/api/login').send({
    username: testUser.username,
    password: testUser.password
  })

  return `Bearer ${loginResponse.body.token}`
}

module.exports = {
  blogsInDb,
  usersInDb,
  logInTestUser
}
