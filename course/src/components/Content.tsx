import Part from './Part';
import { type CoursePart } from '../types.ts';

interface coursePartsProps {
  courseParts: CoursePart[];
}

const Content = (props: coursePartsProps) => {
  return props.courseParts.map((coursePart) => (
    <Part key={coursePart.name} coursePart={coursePart} />
  ));
};

export default Content;
