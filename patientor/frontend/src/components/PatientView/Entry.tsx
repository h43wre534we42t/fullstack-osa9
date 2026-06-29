import { Entry } from '../../types.ts';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entries: Entry[];
}

const BaseDetails = ({ entry }: { entry: Entry }) => (
  <div>
    <div>{entry.date}</div>
    <div>{entry.description}</div>
    <div>diagnosed by {entry.specialist}</div>
  </div>
);

const Heart = ({ status }: { status: number }) => {
  switch (status) {
    case 0:
      return <FavoriteIcon style={{ color: 'green' }} />;
    case 1:
      return <FavoriteIcon style={{ color: 'yellow' }} />;
    case 2:
      return <FavoriteIcon style={{ color: 'orange' }} />;
    case 3:
      return <FavoriteIcon style={{ color: 'black' }} />;
    default:
      return null;
  }
};

const entryStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '12px',
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div style={entryStyle}>
          <BaseDetails entry={entry} />
          <Heart status={entry.healthCheckRating} />
        </div>
      );

    case 'Hospital':
      return (
        <div style={entryStyle}>
          <BaseDetails entry={entry} />
          discharged: {entry.discharge.date} because of reason:{' '}
          {entry.discharge.criteria}
        </div>
      );

    case 'OccupationalHealthcare':
      return (
        <div style={entryStyle}>
          <BaseDetails entry={entry} />
          employer: {entry.employerName}
        </div>
      );

    default:
      return null;
  }
};

const Entries = ({ entries }: Props) => {
  return (
    <div>
      <h3>entries</h3>
      {entries.map((e) => (
        <EntryDetails key={e.id} entry={e} />
      ))}
    </div>
  );
};

export default Entries;
