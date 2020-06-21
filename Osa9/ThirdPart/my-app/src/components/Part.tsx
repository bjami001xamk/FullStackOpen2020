import React from 'react';
import { CoursePart } from '../index';
interface coursePart{
    coursePart: CoursePart
}

const Part : React.FC<coursePart> = ({coursePart}) => {
    switch (coursePart.name) {
        case "Deeper type usage" :
            console.log(coursePart.description)
            return <></>

    default: return <></>
    }
};


export default Part;