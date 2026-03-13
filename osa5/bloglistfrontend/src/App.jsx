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

  
  const handleLogin = async (event) => {
    event.preventDefault()
      try {
      const user = await loginService.login({ username, password })
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

  const isAuthenticated = user !== null
  
  return (
    console.log(user),
    isAuthenticated
    ? <BlogsView 
    name={user.name}
    blogs={blogs} /> 
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