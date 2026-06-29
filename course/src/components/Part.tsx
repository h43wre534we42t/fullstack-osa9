import { type CoursePart } from '../types.ts';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

interface PartProps {
  coursePart: CoursePart;
}

const Part = (props: PartProps) => {
  const part = props.coursePart;
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3>
            {part.name}
            <> </>
            {part.exerciseCount}
          </h3>
          {part.description}
        </div>
      );
    case 'group':
      return (
        <div>
          <h3>
            {part.name}
            <> </>
            {part.exerciseCount}
          </h3>
          project exercises {part.groupProjectCount}
        </div>
      );
    case 'background':
      return (
        <div>
          <h3>
            {part.name}
            <> </>
            {part.exerciseCount}
          </h3>
          {part.description}
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case 'requirements':
      return (
        <div>
          <h3>
            {part.name}
            <> </>
            {part.exerciseCount}
          </h3>
          {part.description}
          <div>requirements [{part.requirements.join(' | ')}]</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
