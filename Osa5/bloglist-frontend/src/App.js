import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setNewErrorMessage] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNewErrorMessage('You have logged in successfully')
      setTimeout(() => {
        setNewErrorMessage('')
      }, 3000)
    } catch (exception) {
      setNewErrorMessage('Wrong username or password')
      setTimeout(() => {
        setNewErrorMessage('')
      }, 3000)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async(blogToBeAdded) => {

    try {
      console.log(blogToBeAdded)
      const blogThatHasBeenAdded = await blogService.create(blogToBeAdded)
      setBlogs(blogs.concat(blogThatHasBeenAdded))
      setNewErrorMessage(`a new blog ${blogToBeAdded.title} by ${blogToBeAdded.author} added`)
      setCreateBlogVisible(false)
      setTimeout(() => {
        setNewErrorMessage('')
      }, 3000)


    } catch (e) {
      console.log(e)
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )


  const blogForm = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }
    return(
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm
            createBlog={addBlog}
          />
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
        <div id='allBlogs'>
          {blogs.sort((a, b) => {
            return b.likes - a.likes
          }).map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />
          )
          }
        </div>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>{errorMessage}</p>

      {user === null ? loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
        </div>
      }


    </div>
  )
}

export default App
