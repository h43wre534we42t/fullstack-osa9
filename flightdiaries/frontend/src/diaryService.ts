import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types.ts';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
      throw new Error('Failed to fetch diary entries', {
        cause: error,
      });
    } else {
      console.error(error);
    }
  }
};

const create = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response.data.error[0].message, {
        cause: error,
      });
    } else {
      console.error(error);
    }
  }
};

export default { getAll, create };
