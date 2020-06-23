import React from 'react';
import { CoursePart } from '../index';

interface coursePart{
    coursePart: CoursePart
}

const Part : React.FC<coursePart> = ({coursePart}) => {
    console.log(coursePart)
    console.log(coursePart.name)
    switch (coursePart.name) {
        case "Fundamentals":
            return (
            <>
                <p>{coursePart.name} {coursePart.exerciseCount}</p>
            </>
            )
        case "Deeper type usage":
            return <p>{coursePart.name}</p>
            
        case "Using props to pass data":
            return <p>{coursePart.name}</p>
            
    default: return <></>
    }
}

export default Part;