import patientData from '../../data/patients.ts';
import { v4 as uuidv4 } from 'uuid';
import type { NewPatient, Patient, PatientNoSsn } from '../types.ts';

const patients: PatientNoSsn[] = patientData as Patient[];

const getPatients = () => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
