import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const currentFilter = useSelector(state => state.filter)

    const vote = (id, content) => {
        dispatch(voteAnecdote(id, content))
        dispatch(setNotification(`you voted '${content}'`, 3))

    }
    
    return(
        <>
        {anecdotes
            .filter(anecdote => anecdote.content.includes(currentFilter))
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}
        </>
    )
}

export default AnecdoteList