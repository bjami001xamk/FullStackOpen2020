import { PatientType, NewPatientType } from '../types';
/* eslint-disable @typescript-eslint/no-explicit-any */

const validatefields = (patientObject : NewPatientType) : PatientType => {
    const validatedObject = {
        id: Math.random().toString(36).substring(7),
        name: checkIfItsString(patientObject.name),
        dateOfBirth: checkIfItsString(patientObject.dateOfBirth),
        ssn: checkIfItsString(patientObject.ssn),
        gender: checkIfItsString(patientObject.gender),
        occupation: checkIfItsString(patientObject.occupation)
    };

    return validatedObject;
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

export default validatefields;