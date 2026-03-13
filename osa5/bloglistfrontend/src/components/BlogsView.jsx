import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const BlogsView = ({ name, blogs, handleLogout, handleLikeUpdate, onCreate, blogFormRef }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in <button onClick={handleLogout}>logout</button></p>
      {sortedBlogs.map(blog =>
        <Blog blog={blog} handleLikeUpdate={handleLikeUpdate} />
      )}
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={onCreate} />
      </Togglable>
    </div>
  )
}

export default BlogsView
