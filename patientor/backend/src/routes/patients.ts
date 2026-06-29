import express from 'express';
import patientService from '../services/patientService.ts';
import { z } from 'zod';
import { NewPatientSchema, NewEntrySchema } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatientsSensitive();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patients = patientService.getPatients();
  res.send(patients.find((p) => p.id === req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatient);

    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/:id', (req, res) => {
  try {
    const newEntry = NewEntrySchema.parse(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);

    res.json(addedEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
