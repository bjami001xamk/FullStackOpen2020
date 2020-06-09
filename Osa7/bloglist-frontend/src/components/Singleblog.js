import React from 'react'
import { useParams } from 'react-router-dom'

const Singleblog = ({ blogs }) => {
    const id = useParams().id
    const currentBlog = blogs.find(blog => blog.id === id)
    console.log(currentBlog)
    if(!currentBlog) {
        return null
    }
    return(
        <>
        <h2>{currentBlog.title}</h2>
        <p>{currentBlog.url}</p>
        <p>{currentBlog.likes} likes</p>
        <p>added by {currentBlog.user.name}</p>
        </>
    )
}

export default Singleblog