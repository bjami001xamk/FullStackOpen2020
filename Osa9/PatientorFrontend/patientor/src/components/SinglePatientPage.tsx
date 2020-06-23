import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";
import { Patient } from '../types'

const SinglePatientPage: React.FC = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    let { id } = useParams<{ id: string }>();
    const [ currentPerson, setCurrentPerson] = useState< Patient | null>(null)
    const getThePerson = () => {
        axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then(({data}) => {
            dispatch(addPatient(data));
            setCurrentPerson(data);
        })
    }
    useEffect(() => {
        if(patients[id] && !currentPerson) {
            setCurrentPerson(patients[id])
        }
        if(currentPerson) {
            if(!currentPerson.ssn){
                getThePerson();
            }
        }
    },[patients,currentPerson])

    if(!patients[id]){
        return <>loading</>
    }
    
    if(!currentPerson) {
        return <>loading</>
    }
    if(!currentPerson.ssn) {
        return <>loading</>
    }
    console.log(diagnoses)

    return(
        <div>
            <p>{currentPerson.name}</p>
            <p>gender:{currentPerson.gender}</p>
            <p>ssn:{currentPerson.ssn}</p>
            <p>occupation:{currentPerson.occupation}</p>
            <h4>Entries</h4>
            {currentPerson.entries.map(entry => (
                <div>
                    <p key={entry.id}>{entry.date} {entry.description}</p>
                    {entry.diagnosisCodes?.map(code => (
                        <p>{code} {diagnoses[code].name}</p>
                    ))}
                </div>
                
            ))}

        </div>
    )

}
/*{patients[id].entries.map(entry => {
    <p>{entry.date} {entry.description}</p>
    {entry.diagnosisCodes?.map(code => {
        <p>{code}</p>
    })}
     {currentPerson.entries.map(entry => (
                <p>{entry.date} {entry.description}</p>
            ))}
})}*/

export default SinglePatientPage;