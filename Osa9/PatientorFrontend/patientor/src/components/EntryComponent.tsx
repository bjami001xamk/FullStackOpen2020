import React from 'react';
import { Entry } from '../types'

interface EntryInterface {
    entry: Entry
}

const assertNever = (value:never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}


const EntryComponenent : React.FC<EntryInterface> = ({entry}) => {
    switch(entry.type) {
        case "HealthCheck":
            return (
                <div style={{border: "1px solid black"}}>
                    <p>{entry.date} {entry.specialist} </p>
                    <p>{entry.description}</p>
                    <p>HealthRating: {entry.healthCheckRating}</p>
                </div>
            )
        
        case "Hospital":
            return (
                <div style={{border: "1px solid black"}}>
                    <p>{entry.date} {entry.specialist} </p>
                    <p>{entry.description}</p>
                </div>
            )

        case "OccupationalHealthcare":
            return (
                <div style={{border: "1px solid black"}}>
                    <p>{entry.date} {entry.employerName} </p>
                    <p>{entry.description}</p>
                    
                </div>
            )

        default:
            return assertNever(entry)

    }        
}

export default EntryComponenent