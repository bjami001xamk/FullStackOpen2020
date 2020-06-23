import React from 'react'
import Part from './Part'
import { CoursePart } from '../index'


interface ContentProps {
    courseParts: CoursePart[]
}

const Content : React.FC<ContentProps> = ({courseParts}) => {
     return (
        <div>
            {courseParts.map(coursePart => 
                <Part key={coursePart.name} coursePart={coursePart} />
            )}
        </div>
    )
}

export default Content