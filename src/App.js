import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  // Login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // New blog states
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // Notification states
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
    const existingUser = localStorage.getItem('user')
    if (existingUser) {
      setUser(JSON.parse(existingUser))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userResponse = await loginService.login(username, password)
      setUser(userResponse)
      localStorage.setItem('user', JSON.stringify(userResponse))
      setUsername('')
      setPassword('')
    } catch(error) {
      setErrorMessage('invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      console.log('handlelogin error ', error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      await blogService.createBlog(user.token, newBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setSuccessMessage(`new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch(error) {
      console.log('handleNewBlog ', error)
    }
  }

  return (
    <>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      {user === null ? 
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> :
        <div>
          <h2>blogs</h2>
          <div> {user.name} logged in </div>
          <button onClick={handleLogout}>log out</button>
          <br />
          <CreateBlogForm handleCreateBlog={handleCreateBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
          {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        
      }
    </>
  )
}

export default App
