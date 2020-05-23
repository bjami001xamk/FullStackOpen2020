import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
    <td>
    <button onClick={props.handleClick}>{props.text}</button>
    </td>
  )

}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if(total === 0){
    return(
      <>
        <table><tbody><tr><td>No feedback given</td></tr></tbody></table>
      </>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={total} />
        <StatisticLine text="avarage" value={(props.good-props.bad)/total} />
        <StatisticLine text="positive" value={props.good/total * 100} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  if(props.text === "positive") {
    return(
      <tr><td>{props.text}</td><td>{props.value} %</td></tr>
    )
  }
  return(
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <table>
        <tbody>
          <tr>
            <Button handleClick={() => setGood(good + 1)} text="good" value={good}/>
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" value={neutral}/>
            <Button handleClick={() => setBad(bad + 1)} text="bad" value={bad}/>
          </tr>
        </tbody>
      </table>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)