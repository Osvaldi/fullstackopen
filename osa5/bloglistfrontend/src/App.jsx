import { useState, useEffect, useRef } from 'react'
import LoginView from './components/LoginView'
import BlogsView from './components/BlogsView'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const BlogViewRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()
      try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`Welcome ${user.name}!`, 'success')
    } catch {
      showNotification('Check your username and password', 'error')
    }
  }

  const handleBlogCreation = async ({ title, author, url }) => {
    try {
      BlogViewRef.current.toggleVisibility()
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
    } catch {
      showNotification('error creating blog', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLikeUpdate = async (blog) => {
    try {
      const blogToUpdate = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1
      }

    const updatedBlog = await blogService.update(blog.id, blogToUpdate)
      setBlogs(blogs.map(b =>
        b.id === blog.id ? { ...updatedBlog, user: blog.user } : b
      ))
    } catch {
      showNotification('error updating blog', 'error')
    }
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showNotification('blog removed', 'success')
      } catch {
        showNotification('error removing blog', 'error')
      }
    }
  }


  const isAuthenticated = user !== null
  
  return (
    <div>
      <Notification notification={notification} />
      {isAuthenticated
        ? <BlogsView
            name={user.name}
            blogs={blogs}
            handleLogout={handleLogout}
            handleLikeUpdate={handleLikeUpdate}
            handleDeleteBlog={handleDeleteBlog}
            onCreate={handleBlogCreation}
            blogFormRef={BlogViewRef}
          />
        : <LoginView
            username={username}
            password={password}
            handleLogin={handleLogin}
            onUsernameChange={({ target }) => setUsername(target.value)}
            onPasswordChange={({ target }) => setPassword(target.value)}
          />}
    </div>
  )
}

export default App