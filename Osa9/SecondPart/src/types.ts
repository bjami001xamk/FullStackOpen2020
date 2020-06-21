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
    occupation:string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{

}

export interface NewPatientType {
    name:string,
    dateOfBirth:string,
    ssn: string,
    gender: string,
    occupation:string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type PublicPatient = Omit<PatientType, 'ssn' | 'entries' >;