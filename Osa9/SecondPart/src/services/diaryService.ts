import diaries from '../../data/diaries';

import { DiaryEntry } from '../types';


const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};