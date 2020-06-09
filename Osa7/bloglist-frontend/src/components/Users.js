import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({users, userBlogsQuantity}) => {
    return(
        <>
            <h2>Users</h2>
            
            
            <table>
                <thead><tr><td></td><td>blogs created</td></tr></thead>
                <tbody>
                {users.map((user, index) => 
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{userBlogsQuantity[index]}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )



}

export default Users

