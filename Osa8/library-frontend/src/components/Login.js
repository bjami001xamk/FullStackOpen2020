import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

const Login = (props) => {
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const LOGIN = gql`
        mutation login($username: String!, $password: String!) {
            login(username: $username, password: $password)  {
                value
            }
        }
    `

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            //alert(error.graphQLErrors[0].message)
            console.log(result)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            localStorage.setItem('blogApp', token)
            props.setToken(token)
        }
    }, [result.data])
    
    
    if (!props.show) {
        return null
    }
    
    const loginUser = async() => {
        login({ variables: { username: name, password }})
    }
   

    return (
        <div>
            name: <input value={name} onChange={({target}) => setName(target.value)} /><br/>
            password: <input value={password} onChange={({target}) => setPassword(target.value)} /><br/>
            <button type='button' onClick={() => loginUser()}>Login</button>
        </div>
    )
}

export default Login