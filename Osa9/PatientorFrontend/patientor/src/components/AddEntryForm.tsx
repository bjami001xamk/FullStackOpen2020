import React from 'react'
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, NumberField } from "../AddPatientModal/FormField"
import { Patient } from "../types";
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry, HealthCheckRating, HealthCheckEntryOutgoing }  from '../types';
import { useParams } from 'react-router-dom';



const AddEntryForm = () => {
    const [{ patients }, dispatch] = useStateValue();
    let { id } = useParams();
    console.log(id);
    const onSubmit = async(values: HealthCheckEntryOutgoing) => {
        

        try {
          const { data: newPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch({ type: "UPDATE_PATIENT", payload: newPatient });
        } catch (e) {
          console.error(e.response.data);
          //setError(e.response.data.error);
        }
          
    
    }



    return (
        <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        healthCheckRating: 0,
        type: "HealthCheck",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if(!(values.healthCheckRating === 0 || values.healthCheckRating === 1 || values.healthCheckRating === 2 || values.healthCheckRating === 3))
            errors.healthCheckRating = requiredError;
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
              <h3>Add healthcare entry</h3>
            <Field
              label="Date"
              placeholder="Date YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            
            <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                  type="submit"
                  floated="left"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    )

};

export default AddEntryForm;