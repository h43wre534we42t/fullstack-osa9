const DiaryView = ({ diaries }) =>
  diaries.map((diary) => (
    <div key={diary.id}>
      <div>{diary.date}</div>
      <div>Weather: {diary.weather}</div>
      <div>Visibility: {diary.visibility}</div>
      <div> -----------------</div>
    </div>
  ));

export default DiaryView;
