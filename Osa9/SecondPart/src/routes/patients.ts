import express from 'express';
import { PatientType, NewPatientType } from '../types';
import PatientJson from '../../data/patients';
import validatefields from '../utils/validatefields';

const router = express.Router();

const patientData: PatientType[] = PatientJson;

const getPatientsWithoutSSN = () : Omit<PatientType, 'ssn'>[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatientToDB = (patientObject : NewPatientType) : PatientType => {
    const newPatientObject = validatefields(patientObject);
    
    /*const newPatientObject : PatientType = { 
        id: Math.random().toString(36).substring(7), 
        ...patientObject 
    };*/
    patientData.push(newPatientObject);
    return newPatientObject;
};


router.get('/', (_req, res) => {
    res.send(getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
    try {
        const result = addPatientToDB(req.body);
    res.send(result);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
    
});

/*const validatefiled = (patientObject: NewPatientType) => {
    console.log(patientObject);
};*/

export default router;