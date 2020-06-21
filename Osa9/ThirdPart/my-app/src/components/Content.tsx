import React from 'react'
import Part from './Part'
import { CoursePart } from '../index';
interface ContentProps {
    courseParts: CoursePart[]
}

const Content : React.FC<ContentProps> = ({courseParts}) => {

     return (
        <div>
            {courseParts.map(coursePart => {
                <Part coursePart={coursePart} />
            })}
        </div>
    )


    /*return (
        <>
        <p>
            {courseParts[0].name} {courseParts[0].exerciseCount}
        </p>
        <p>
            {courseParts[1].name} {courseParts[1].exerciseCount}
        </p>
        <p>
            {courseParts[2].name} {courseParts[2].exerciseCount}
        </p>
        </>
    )*/


}

export default Content