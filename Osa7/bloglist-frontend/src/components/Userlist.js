import React from 'react'
import { useParams } from 'react-router-dom'

const Userlist = ({users}) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)
    if(!user) {
        return null
    }

    const blogs = user.blogs
    return (
        <>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            <ul>
                {blogs.map(blog => 
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </>
    )
}

export default Userlist