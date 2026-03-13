import { useState } from 'react'

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


const Blog = ({ blog }) => {
  const [showContent, setShowContent] = useState(false)

  const toggleContent = () => setShowContent(prev => !prev)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleContent}>{showContent ? 'hide' : 'view'}</button>
      {showContent && (
        <>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button>like</button>
          <br />
          {blog.user.name}
        </>
      )}
    </div>
  )
}

export default Blog