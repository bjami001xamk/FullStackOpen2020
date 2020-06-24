import { PatientType, NewPatientType, Gender } from '../types';
import { Entry } from '../types';
/* eslint-disable @typescript-eslint/no-explicit-any */

export const validatefields = (patientObject : NewPatientType) : PatientType => {
    const validatedObject = {
        id: Math.random().toString(36).substring(7),
        name: checkIfItsString(patientObject.name),
        dateOfBirth: checkIfItsString(patientObject.dateOfBirth),
        ssn: checkIfItsString(patientObject.ssn),
        gender: validateGender(patientObject.gender),
        occupation: checkIfItsString(patientObject.occupation),
        entries: patientObject.entries
    };

    return validatedObject;
};

const isGender = (incomingValue : any): incomingValue is Gender => {
    return Object.values(Gender).includes(incomingValue);
};

const validateGender = ( gender: any): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrrect or missing gender: ' + String(gender));
    }
    return gender;
};

const checkIfItsString = (incomingValue : any) : string => {
    if(!incomingValue || !isString(incomingValue)) {
        throw new Error('Incorrect value');
    }
    return incomingValue;
};

const isString = (text : any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const validateEntry = (entry : Entry) : Entry => {
    switch (entry.type) {
        case "HealthCheck":
            checkIfItsString(entry.date);
            checkIfItsString(entry.description);
            checkIfItsString(entry.specialist);
            //checkIfItsString(entry.healthCheckRating);  
            break;    
        case "Hospital":
            checkIfItsString(entry.date);
            checkIfItsString(entry.description);
            checkIfItsString(entry.specialist);
            break;
        case "OccupationalHealthcare":
            checkIfItsString(entry.date);
            checkIfItsString(entry.description);
            checkIfItsString(entry.specialist);
            checkIfItsString(entry.employerName);
            break;
        default:
            break;
    }
    entry.id = Math.random().toString(36).substring(7);
    return entry;

};