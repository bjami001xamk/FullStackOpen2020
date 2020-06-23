export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
    id: number,
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export interface DiagnoseType {
    code: string,
    name: string,
    latin?: string
}

export interface PatientType {
    id:string,
    name:string,
    dateOfBirth:string,
    ssn: string,
    gender: string,
    occupation:string,
    entries: Entry[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface NewPatientType {
    name:string,
    dateOfBirth:string,
    ssn: string,
    gender: string,
    occupation:string,
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type PublicPatient = Omit<PatientType, 'ssn' | 'entries' >;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseType['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string
    }
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;
