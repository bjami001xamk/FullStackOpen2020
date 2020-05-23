import React from 'react'
import ReactDOM from 'react-dom'



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (course) => {
  return (
    <h1>{course.course}</h1>
  )
}

const Total = (parts) => {
  return(
    <p>Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises}</p>
  )
}

const Content = (parts) => {
  return(
    <>
      <Part part={parts.parts[0].name} exercise={parts.parts[0].exercises} />
      <Part part={parts.parts[1].name} exercise={parts.parts[1].exercises} />
      <Part part={parts.parts[2].name} exercise={parts.parts[2].exercises} />
    </>  
  )
}

const Part = (part) => {
  return(
    <p>
      {part.part} {part.exercise}
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
