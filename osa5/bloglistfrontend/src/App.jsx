import { useState, useEffect } from 'react'
import LoginView from './components/LoginView'
import BlogsView from './components/BlogsView'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogCreation = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
    } catch {
      console.log('error creating blog')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const isAuthenticated = user !== null
  
  return (
    isAuthenticated
    ? <BlogsView
        name={user.name}
        blogs={blogs}
        handleLogout={handleLogout}
        onCreate={handleBlogCreation}
      /> 
    : <LoginView
        username={username}
        password={password}
        handleLogin={handleLogin}
        onUsernameChange={({ target }) => setUsername(target.value)}
        onPasswordChange={({ target }) => setPassword(target.value)}
      />
  )
}

export default App