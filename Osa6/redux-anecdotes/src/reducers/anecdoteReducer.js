/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/
import anecService from '../services/anecdotes'



const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE_ANECDOTE':
      let anecdoteToChange = state.find(anecdote => anecdote.id === action.data.id)
      anecdoteToChange.votes += 1
      return state.map(anecdote => anecdote.id === action.data.id ? anecdoteToChange : anecdote)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECS':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id, content) => {
  return async(dispatch) => {
    const updatedAnec = await anecService.voteAnec(id, content)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { id:updatedAnec.id, content:updatedAnec.content }
    })
  }
  
  /*return {
    type: 'VOTE_ANECDOTE',
    data: { id, content }
  }*/
}

export const addAnec = (content) => {
  return async (dispatch) => {
    const newAnec = await anecService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnec
    })
  }
}

export const initializeAnecs = () => {
  return async (dispatch) => {
    const anecs = await anecService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecs
    })
  }
}

export default reducer