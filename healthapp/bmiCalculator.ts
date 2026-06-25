interface Values {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 18.5) {
    return 'Underweight range';
  }
  if (bmi <= 24.9) {
    return 'Normal range';
  }
  if (bmi <= 29.9) {
    return 'Overweight range';
  }
  return 'Obese range';
};

if (process.argv[1] === import.meta.filename) {
  // do not run this code if module is imported

  try {
    const { weight, height } = parseArguments(process.argv);
    console.log(calculateBmi(weight, height));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
export default calculateBmi;
