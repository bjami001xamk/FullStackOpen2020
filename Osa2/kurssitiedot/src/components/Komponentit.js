import React from 'react'

const Course = (courses) => {
    return(
      <>
        <Header course={courses.courses} />
        <Content courses={courses.courses} />
        <Total courses={courses.courses} />
      </>
    )
}

const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Total = (props) => {
    let tulos = props.courses.parts.reduce((kokonaisMaara, exercises) => {
        return kokonaisMaara + exercises.exercises
    },0)

    return(
      <h3>Number of exercises {tulos}</h3>
    )
}

const Content = (props) => {
    return(
        <>
        <Part parts={props.courses.parts} />
      </>  
    )
}
  
const Part = (props) => {
    return(
      <>
        {props.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </>
    )
}

export default Course