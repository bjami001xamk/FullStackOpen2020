import express from 'express';
import { PatientType, NewPatientType, Entry } from '../types';
import PatientJson from '../../data/patients';
import { validatefields, validateEntry } from '../utils/validatefields';

const router = express.Router();

const patientData: PatientType[] = PatientJson;

const getPatientsWithoutSSN = () : Omit<PatientType, 'ssn' | 'entries'>[] => {
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





const findPatient = (id : string) => {
    const patient = PatientJson.find(person => person.id === id);
    return patient;
};

router.get('/:id', (req, res) => {

    
    res.send(findPatient(req.params.id));
});

/*const validatefiled = (patientObject: NewPatientType) => {
    console.log(patientObject);
};*/






router.post('/:id/entries', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const incomingEntry : Entry = req.body;
    const id = req.params.id;

    try {
        const newEntry = validateEntry(incomingEntry);
        const currentPatient = patientData.find(patient => patient.id === id);
        
        if(currentPatient) {
            currentPatient.entries.push(newEntry);
            res.send(currentPatient).end();
        } else {
            res.status(400).send('cannot find that patient');
        }

    } catch (e) {
        console.log(e);
        res.status(404).end();
    }

});

















export default router;