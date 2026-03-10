const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { testBlogs } = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const emptyList = []
  const listWithOneBlog = [testBlogs[1]]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testBlogs)
    assert.strictEqual(result, 36)
  })
})