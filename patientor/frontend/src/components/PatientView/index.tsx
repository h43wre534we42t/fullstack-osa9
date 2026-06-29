import { useParams } from 'react-router-dom';
import { Patient, Gender, Diagnosis } from '../../types.ts';
import { useEffect, useState } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Entries from './Entry.tsx';
import AddEntry from './AddEntry.tsx';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';

const PatientView = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [allDiagnoses, setAllDiagnoses] = useState<Diagnosis[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const id = useParams<string>().id;

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);

      if (!patient) return null;

      const diagnoses = await diagnosisService.getAll();

      const patientCodes = patient.entries.flatMap((e) => e.diagnosisCodes);
      setAllDiagnoses(diagnoses);
      setDiagnoses(diagnoses.filter((d) => patientCodes.includes(d.code)));
    };
    void fetchPatient();
  }, [id]);

  if (!patient || !id) return null;

  const genderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <QuestionMarkIcon />; // couldn't find appropriate icon for other
    }
  };

  const diagnosisView = diagnoses
    ? diagnoses.map((d) => (
        <li key={d.code}>
          {d.code} {d.name}
        </li>
      ))
    : null;

  return (
    <div>
      <h2>
        {patient.name} {genderIcon()}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of Birth: {patient.dateOfBirth}</p>
      <button onClick={() => setShow(!show)}>
        {show ? 'Cancel' : 'Add New Entry'}
      </button>
      <AddEntry
        show={show}
        id={id}
        patient={patient}
        setPatient={setPatient}
        diagnoses={allDiagnoses}
        patientDiagnoses={diagnoses}
        setDiagnoses={setDiagnoses}
      />
      <Entries entries={patient.entries} />
      {diagnosisView}
    </div>
  );
};

export default PatientView;
