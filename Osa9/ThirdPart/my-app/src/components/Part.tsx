import React from 'react';
import { CoursePart } from '../index';


const assertNever = (value:never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

interface coursePart{
    coursePart: CoursePart
}

const Part : React.FC<coursePart> = ({coursePart}) => {
    switch (coursePart.name) {
        case "Fundamentals":
            return (
                    <div>
                        <p>{coursePart.name} {coursePart.exerciseCount} </p>
                        <p>{coursePart.description}</p>
                    </div>
        )
        case "Deeper type usage":
            return (
                <div>
                    <p>{coursePart.name} {coursePart.exerciseCount} </p>
                    <p>{coursePart.description}</p>
                </div>
            )
        case "Using props to pass data":
            return (
                    <div>
                        <p>{coursePart.name} {coursePart.exerciseCount} </p>
                        <p>GroupProjectCount: {coursePart.groupProjectCount}</p>
                    </div>
                ) 
        case "testia":
            return(
                <div>
                        <p>{coursePart.name} {coursePart.exerciseCount} </p>
                        <p>{coursePart.description}</p>
                    </div>
            )

        default: 
            return assertNever(coursePart)
        }
}

export default Part;