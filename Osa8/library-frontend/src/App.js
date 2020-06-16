
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription, gql } from '@apollo/client'
import Recommend from './components/Recommend'
import { FILTERED_BOOKS } from './components/Books'

export const BOOK_ADDED = gql`
  subscription{
    bookAdded{
      title,
      author{
        name,
        born
      }
      published,
      genres}
  }
  `


const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)
  const [ token, setToken ] = useState(null)
  const VisibleWhenLoggedIn = token !== null ? {display:''} : {display:'none'}
  const HiddenWhenLoggedIn = token !== null ? {display:'none'} : {display:''}
  const client = useApolloClient()



  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: FILTERED_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: FILTERED_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }




  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      alert('new Book has arrived ', subscriptionData)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })




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