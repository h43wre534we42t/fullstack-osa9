import patientData from '../../data/patients.ts';
import { v4 as uuidv4 } from 'uuid';
import type {
  NewPatient,
  Patient,
  PatientNoSsn,
  NewEntry,
  Entry,
} from '../types.ts';

const patients: Patient[] = patientData;

const getPatients = () => {
  return patients.map(
    ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
    }),
  );
};

const patientsSensitive: PatientNoSsn[] = patientData;

const getPatientsSensitive = () => {
  return patientsSensitive.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = { ...entry, id: uuidv4() };
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientsSensitive,
  getPatients,
  addPatient,
  addEntry,
};
