import express from 'express';
import diagnosisService from '../services/diagnosisService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnosisService.getDiagnoses();
  res.send(diagnoses);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;
