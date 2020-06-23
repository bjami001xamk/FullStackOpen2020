import { State } from "./state";
import { Patient, DiagnoseType } from "../types";

export type Action =
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: DiagnoseType[]
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | { type: "UPDATE_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          )
        }
      }
      


    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const Patients = state.patients
      Patients[action.payload.id] = action.payload
      
      return {
        ...state,
        patients: {
          ...Patients
        }
        
      };

    default:
      return state;
  }
};
