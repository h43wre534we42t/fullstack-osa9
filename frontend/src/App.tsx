import { useState, useEffect } from 'react';
import type { Note } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Note[]>([]);
  const [newDiary, setNewDiary] = useState('');

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService.create({ content: newDiary }).then((returnedDiary) => {
      setDiaries(diaries.concat(returnedDiary));
    });
    setNewDiary('');
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newDiary}
          onChange={(event) => setNewDiary(event.target.value)}
        />
        <button type='submit'>add</button>
      </form>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>{diary.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
