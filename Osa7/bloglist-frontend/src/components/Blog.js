import React, { useState } from 'react'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'
import { UseDispatch, useDispatch } from 'react-redux'



const Blog = ({ blog, setBlogs, user }) => {
  const dispatch = useDispatch()
  const [singleBlogVisible, setSingleBLogVisible] = useState(false)
  const showWhenVisible = { display: singleBlogVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius:5
  }

  const addLike = async() => {
    const serverUrl = '/api/blogs/' + blog.id
    const blogThatIsLeaving = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const blogsAfterUpdate = await blogServices.update(blogThatIsLeaving, serverUrl)
    dispatch(setBlogs(blogsAfterUpdate))
  }

  const removeBlog = async() => {
    if (window.confirm(`Remove blog: ${blog.title}?`)) {
      const id = blog.id
      const blogsAfterDeletion = await blogServices.deleteBlog(id)
      dispatch(setBlogs(blogsAfterDeletion))
    }
  }

  const isCreatorSameAsloggedIn = { display: blog.user.username === user.username ? '' : 'none' }

  return(
    <>
      <div>
        {blog.title} {blog.author} <button id={`v` + blog.title} onClick={() => setSingleBLogVisible(singleBlogVisible ? false : true)}>View</button>
      </div>
      <div style={showWhenVisible} className='urlAndLikes'>
        <div style={blogStyle} >
          {blog.url}<br/>
          {blog.likes} <button id={blog.title} onClick={() => addLike()}>Like</button><br/>
          <button style={isCreatorSameAsloggedIn} onClick={() => removeBlog()}>Remove</button>
        </div>
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog

