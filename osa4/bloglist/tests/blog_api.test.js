const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { testBlogs, blogsInDb } = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, testBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map((e) => e.title)
    assert(contents.includes('React patterns'))
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog) => {
      assert(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })
})

describe('addition of a new note', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'a valid blog can be added',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await blogsInDb()
    assert.strictEqual(blogsAfterPost.length, testBlogs.length + 1)

    const contents = blogsAfterPost.map((b) => b.title)
    assert(contents.includes('a valid blog can be added'))
  })

  test('blog without likes has initial value 0', async () => {
    const newBlog = {
      title: 'blog without likes has initial value 0',
      author: 'Test Author',
      url: 'https://example.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await blogsInDb()
    const addedBlog = blogsAfterPost.find(b => b.title === 'blog without likes has initial value 0')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('blog without title or url returns 400 Bad Request', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog1 = {
      title: 'blog without title or url returns 400 Bad Request',
      author: 'Test Author',
      likes: 42
    }

    const newBlog2 = {
      author: 'Test Author',
      url: 'https://example.com',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)

    const blogsAtEnd = await blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()
    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
})


after(async () => {
  await mongoose.connection.close()
})