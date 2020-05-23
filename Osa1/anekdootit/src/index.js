import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const arvoUusi = () => {setSelected(Math.round(Math.random()*(anecdotes.length-1)))}
  const taulukko = new Array(6).fill(0)
  const [taulukkoTesti, settaulukkoTesti] = useState(taulukko)
  const aanesta = () => {
    const copy = [...taulukkoTesti]
    copy[selected] +=1
    settaulukkoTesti(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <p>has {taulukkoTesti[selected]} votes</p>
      <button onClick= {() => aanesta()}>vote</button>
      <button onClick= {() => arvoUusi()}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[taulukkoTesti.indexOf(Math.max(...taulukkoTesti))]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)