import React, {useEffect} from 'react'
import AnecdoteForm from './components/Anecdoteform'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecs } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecs())
  }, [dispatch])
  
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
    
  )
}

export default App