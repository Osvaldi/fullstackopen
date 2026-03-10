const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0
  return blogs.reduce(
    (sum, blog) => sum + blog.likes,
    initialValue)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce(
    (favorite, current) => (favorite.likes > current.likes) ? favorite : current)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const countsByAuthor = blogs.reduce(
    (counter, blog) => {counter[blog.author] = (counter[blog.author] || 0) + 1
      return counter
    }, {})

  const authorWithMostBlogs = Object.keys(countsByAuthor).reduce(
    (top, author) => (countsByAuthor[author] > countsByAuthor[top]) ? author : top)

  return {
    author: authorWithMostBlogs,
    blogs: countsByAuthor[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const countsByAuthor = blogs.reduce(
    (counter, blog) => {counter[blog.author] = (counter[blog.author] || 0) + blog.likes
      return counter
    }, {})

  const authorWithMostLikes = Object.keys(countsByAuthor).reduce(
    (top, author) => (countsByAuthor[author] > countsByAuthor[top]) ? author : top)

  return {
    author: authorWithMostLikes,
    likes: countsByAuthor[authorWithMostLikes]
  }
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}