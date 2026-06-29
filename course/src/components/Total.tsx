interface totalExercisesProps {
  totalExercises: number;
}

const Total = (props: totalExercisesProps) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

export default Total;
