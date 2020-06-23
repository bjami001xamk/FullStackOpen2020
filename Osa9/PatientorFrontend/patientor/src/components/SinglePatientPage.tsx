import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";
import { Patient } from '../types'

const SinglePatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    let { id } = useParams<{ id: string }>();

    
    const getThePerson = () => {
        axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then(({data}) => {
            dispatch(addPatient(data));
        })
    }
        
    if(!patients[id]) {
        return <>loading</>
    }
    if(!patients[id].ssn) {
        getThePerson()
        return <>loading</>
    }

    return(
        <div>
            <p>{patients[id].name}</p>
            <p>gender:{patients[id].gender}</p>
            <p>ssn:{patients[id].ssn}</p>
            <p>occupation:{patients[id].occupation}</p>
        </div>
    )

}

export default SinglePatientPage;