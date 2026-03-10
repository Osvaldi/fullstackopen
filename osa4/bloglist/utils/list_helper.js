const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0
  return blogs.reduce(
    (sum, blog) => sum + blog.likes,
    initialValue)
}

module.exports = {
  dummy,
  totalLikes
}