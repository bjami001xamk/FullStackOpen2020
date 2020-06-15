
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [ token, setToken ] = useState(null)
  const VisibleWhenLoggedIn = token !== null ? {display:''} : {display:'none'}
  const HiddenWhenLoggedIn = token !== null ? {display:'none'} : {display:''}
  const client = useApolloClient()
  
  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={VisibleWhenLoggedIn} onClick={() => setPage('add')}>add book</button>
        <button style={VisibleWhenLoggedIn} onClick={() => setPage('recommend')}>recommend</button>
        <button style={HiddenWhenLoggedIn} onClick={() => setPage('login')}>login</button>
        <button style={VisibleWhenLoggedIn} onClick={() => logOut()}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommend
        show={page === 'recommend'} token={token}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'} setToken={setToken}
      />

    </div>
  )
}

export default App