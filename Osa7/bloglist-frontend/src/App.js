import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom'
import Users from './components/Users'
import Userlist from './components/Userlist'
import Singleblog from './components/Singleblog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const errorMessage = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const [userBlogsQuantity, setBlogAmounts] = useState([])
  const userBlogsQuantity2 = []
  
  useEffect(() => {
    blogService.getUsers().then((userArray) => {
      setUsers(userArray)
      userArray.forEach(user  => {
        userBlogsQuantity2.push(user.blogs.length)
      });
      setBlogAmounts(userBlogsQuantity2)
    })
    
  },[])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification('You have logged in successfully'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 3000)
    } catch (exception) {
      dispatch(setNotification('Wrong username or password'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 3000)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(setUser(null))
  }

  const addBlog = async(blogToBeAdded) => {

    try {
      const blogThatHasBeenAdded = await blogService.create(blogToBeAdded)
      dispatch(setBlogs(blogs.concat(blogThatHasBeenAdded)))
      dispatch(setNotification(`a new blog ${blogToBeAdded.title} by ${blogToBeAdded.author} added`))
      setCreateBlogVisible(false)
      setTimeout(() => {
        dispatch(setNotification(''))
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
    <Router>
      <div>
        <h2>blogs</h2>

        <p>{errorMessage}</p>
        
        {user === null ? loginForm() :
          <><p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Switch>
            <Route path='/users/:id'>
              <Userlist users={users} />
            </Route>
            <Route path='/users'>
              <Users users={users} userBlogsQuantity={userBlogsQuantity} />
            </Route>
            <Route path='/blogs/:id'>
              <Singleblog blogs={blogs} />
            </Route>
            <Route path='/'>
              <div>
                {blogForm()}
              </div>
            </Route>
          </Switch>
          </>
        }
      

      </div>
    </Router>
    
  )
}

export default App
