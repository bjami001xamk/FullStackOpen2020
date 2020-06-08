import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    console.log(anecdote)
    return (
        <div>
            <h3>{anecdote.content}</h3>
            <p>has {anecdote.votes} votes</p>
            <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
        </div>
    )
}

export default Anecdote