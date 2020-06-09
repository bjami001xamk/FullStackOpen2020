import React, { useState } from 'react'
import blogServices from '../services/blogs'
import PropTypes from 'prop-types'
import { UseDispatch, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


const Blog = ({ blogs, setBlogs, user }) => {
  const currentBlogId = useParams().id
  const dispatch = useDispatch()
  const [singleBlogVisible, setSingleBLogVisible] = useState(false)
  if(blogs.length === 0) {
    return null
  }
  console.log(blogs)
  
  const blog = blogs.find(blog => blog.id === currentBlogId)
  
  
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
      
      <h2>{blog.title} {blog.author}</h2>
      
      <div className='urlAndLikes'>
        <div style={blogStyle} >
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} <button id={blog.title} onClick={() => addLike()}>Like</button><br/>
          added by {blog.user.name} <br/>
          <button style={isCreatorSameAsloggedIn} onClick={() => removeBlog()}>Remove</button>
        </div>
      </div>
    </>
  )
}

/*Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}*/

export default Blog

