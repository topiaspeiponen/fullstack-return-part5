import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      console.log('handling login ', userResponse)
      setUser(userResponse)
      localStorage.setItem('user', JSON.stringify(userResponse))
      setUsername('')
      setPassword('')
    } catch(error) {
      console.log('handlelogin error ', error)
    }
  }

  const handleLogout = (e) => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <>
      {user === null ? 
        <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} /> :
        <div>
          <h2>blogs</h2>
          <div> {user.name} logged in </div>
          <button onClick={handleLogout}>log out</button>
          <br />
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
