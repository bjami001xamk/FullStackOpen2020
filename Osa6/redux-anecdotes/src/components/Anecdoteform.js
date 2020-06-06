import React from 'react'
//import { useDispatch } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        console.log(props.addAnec)
        
        event.preventDefault()
        let anecdote = event.target.anecInput.value
        props.addAnec(anecdote)
        props.setNotification(`you created new anecdote: '${anecdote}'`, 4)
        //dispatch(addAnec(anecdote))
        //dispatch(setNotification(`you created new anecdote: '${anecdote}'`, 4))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecInput" /><button type='submit'>Add new Anecdote</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    addAnec,
    setNotification   
}


const ConnectedAnecdoteForm = connect(
    null, 
    mapDispatchToProps
    )(AnecdoteForm)
export default ConnectedAnecdoteForm