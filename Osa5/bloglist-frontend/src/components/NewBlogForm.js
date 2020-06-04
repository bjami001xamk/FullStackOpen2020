import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async(event) => {
    event.preventDefault()
    let blogToBeAdded = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    createBlog(blogToBeAdded)
  }

  return(
    <form onSubmit={addBlog}>
        title: <input id='titleInput'
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
      /><br/>
        author: <input id='authorInput'
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      /><br/>
        url: <input
        value={newUrl} id='urlInput'
        onChange={({ target }) => setNewUrl(target.value)}
      /><br/>
      <button type="submit">create</button><br/>
    </form>
  )
}

export default NewBlogForm