import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';

import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  console.log(req.query);
  if (isNaN(weight) || isNaN(height)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }
  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (target === undefined || daily_exercises === undefined) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const targetNumber = Number(target);
  const daily_exercises_array = daily_exercises.map(Number);

  if (isNaN(targetNumber) || daily_exercises.some((n) => isNaN(Number(n)))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises_array, targetNumber);

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
