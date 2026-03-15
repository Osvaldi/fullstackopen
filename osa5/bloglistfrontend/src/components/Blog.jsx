import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ name, blog, handleLikeUpdate, handleDeleteBlog }) => {
  const [showContent, setShowContent] = useState(false)

  const toggleContent = () => setShowContent(prev => !prev)
  return (
    <div style={blogStyle} class="blog">
      {blog.title} {blog.author}
      <button onClick={toggleContent}>{showContent ? 'hide' : 'view'}</button>
      {showContent && (
        <>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={() => handleLikeUpdate(blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.name === name && (
            <button onClick={() => handleDeleteBlog(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog