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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}