interface statSheet {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  targetHours: number;
  hours: number[];
}

const parseArguments2 = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const hours = args.slice(3);
  const isValid = hours.every((n) => !isNaN(Number(n)));

  if (!isNaN(Number(args[2])) && isValid) {
    return {
      targetHours: Number(args[2]),
      hours: hours.map((n) => Number(n)),
    };
  } else {
    throw new Error('Provided values were incorrectly formatted!');
  }
};

const calculateExercises = (stats: number[], target: number): statSheet => {
  const average =
    stats.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
    stats.length;
  let rating: number;

  if (average > target + 1) rating = 3;
  else if (average < target) rating = 1;
  else rating = 2;

  let ratingDescription: string;

  if (rating === 1) ratingDescription = 'not enough hours per day';
  else if (rating === 2) ratingDescription = 'hours met';
  else ratingDescription = 'more than enough hours met';

  return {
    periodLength: stats.length,
    trainingDays: stats.filter((n) => n > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { targetHours, hours } = parseArguments2(process.argv);
    console.log(calculateExercises(hours, targetHours));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
  }
}

export default calculateExercises;
