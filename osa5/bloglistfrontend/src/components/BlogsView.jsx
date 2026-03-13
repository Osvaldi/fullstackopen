import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

const BlogsView = ({ name, blogs, handleLogout, onCreate, blogFormRef }) => (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={onCreate} />
      </Togglable>
    </div>
)

export default BlogsView
