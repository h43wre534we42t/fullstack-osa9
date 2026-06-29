import { useState, useEffect } from 'react';
import type { DiaryEntry, NewDiaryEntry } from './types.ts';
import { Weather, Visibility } from './types.ts';
import diaryService from './diaryService';
import DiaryView from './components/diaryView';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  });

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService
      .create(newDiary)
      .then((returnedDiary) => {
        setDiaries(diaries.concat(returnedDiary));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });

    setNewDiary({
      date: newDiary.date,
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: '',
    });
  };

  return (
    <div>
      <div>{errorMessage}</div>
      <form onSubmit={diaryCreation}>
        <div>
          Date:
          <input
            type='date'
            onChange={(e) =>
              setNewDiary({
                ...newDiary,
                date: e.target.value,
              })
            }
          />
        </div>
        <div>
          Visibility:
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type='radio'
                value={v}
                checked={newDiary.visibility === v}
                onChange={(e) =>
                  setNewDiary({
                    ...newDiary,
                    visibility: e.target.value as Visibility,
                  })
                }
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          Weather:
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type='radio'
                value={w}
                checked={newDiary.weather === w}
                onChange={(e) =>
                  setNewDiary({
                    ...newDiary,
                    weather: e.target.value as Weather,
                  })
                }
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          Comment:
          <input
            value={newDiary.comment}
            onChange={(e) =>
              setNewDiary({
                ...newDiary,
                comment: e.target.value,
              })
            }
          />
        </div>
        <button type='submit'>Add</button>
      </form>
      <ul>
        <DiaryView diaries={diaries} />
      </ul>
    </div>
  );
};

export default App;
