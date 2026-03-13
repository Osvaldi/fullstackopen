import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const BlogsView = ({ name, blogs, handleLogout, onCreate }) => (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in <button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <NewBlogForm onCreate={onCreate} />
    </div>
)

export default BlogsView
