import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Diagnosis, HealthCheckRating, NewEntry, Patient } from '../../types';
import patientService from '../../services/patients';

interface Props {
  show: boolean;
  id: string;
  patient: Patient;
  setPatient: (patient: Patient) => void;
  diagnoses: Diagnosis[];
  patientDiagnoses: Diagnosis[] | null;
  setDiagnoses: (diagnoses: Diagnosis[]) => void;
}

const AddEntry = ({
  show,
  id,
  patient,
  setPatient,
  diagnoses,
  patientDiagnoses,
  setDiagnoses,
}: Props) => {
  const [date, setDate] = useState<string>('null');
  type EntryType = NewEntry['type'];

  const [type, setType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState<string>('null');
  const [specialist, setSpecialist] = useState<string>('null');
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    try {
      let newEntry: NewEntry;
      const base = {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.length ? diagnosisCodes : undefined,
      };
      switch (type) {
        case 'HealthCheck':
          newEntry = {
            type,
            ...base,
            healthCheckRating,
          };
          break;

        case 'Hospital':
          newEntry = {
            type,
            ...base,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          break;

        case 'OccupationalHealthcare':
          newEntry = {
            type,
            ...base,
            employerName: employerName,
          };
          break;
      }
      const addedEntry = await patientService.addEntry(id, newEntry);
      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });
      if (!patientDiagnoses) return;
      setDiagnoses(
        patientDiagnoses.concat(
          diagnoses.filter((d) => diagnosisCodes.includes(d.code)),
        ),
      );
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const Fields = () => {
    switch (type) {
      case 'HealthCheck':
        return (
          <div>
            Health Check Rating:
            <Select
              value={healthCheckRating}
              label='Type'
              onChange={(e) =>
                setHealthCheckRating(
                  Number(e.target.value) as HealthCheckRating,
                )
              }
            >
              <MenuItem value={0}>0 -- Healthy</MenuItem>
              <MenuItem value={1}>1 -- Low Risk</MenuItem>
              <MenuItem value={2}>2 -- High Risk</MenuItem>
              <MenuItem value={3}>3 -- Critical Risk</MenuItem>
            </Select>
          </div>
        );
      case 'Hospital':
        return (
          <div>
            <label>dicharge date</label>
            <input
              type='date'
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <label>discharge criteria</label>
            <input
              type='text'
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </div>
        );
      case 'OccupationalHealthcare':
        return (
          <div>
            <label>employer name</label>
            <input
              type='text'
              onChange={(e) => setEmployerName(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!show) return null;
  return (
    <div>
      <h2>New entry</h2>
      <form onSubmit={onSubmit}>
        <div>
          Type:
          <Select
            value={type}
            label='Type'
            onChange={(e) => setType(e.target.value as EntryType)}
          >
            <MenuItem value='HealthCheck'>HealthCheck</MenuItem>
            <MenuItem value='Hospital'>Hospital</MenuItem>
            <MenuItem value='OccupationalHealthcare'>
              OccupationalHealthcare
            </MenuItem>
          </Select>
        </div>
        <label htmlFor='Date'>Date</label>
        <input
          id='Date'
          type='date'
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor='Description'>Description</label>
        <input
          id='Description'
          type='text'
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor='Specialist'>Specialist</label>
        <input
          id='Specialist'
          type='text'
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <div>
          Diagnoses:
          <Select
            value={diagnosisCodes}
            label='DiagnosisCodes'
            onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
            multiple={true}
          >
            {patientDiagnoses
              ? diagnoses
                  .filter((d) => !patientDiagnoses.includes(d))
                  .map((d) => (
                    <MenuItem key={d.code} value={d.code}>
                      {d.code} -- {d.name}
                    </MenuItem>
                  ))
              : null}
          </Select>
        </div>
        {Fields()}
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddEntry;
