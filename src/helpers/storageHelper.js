import { LOCAL_STORAGE_NAME } from '../enums/names';

export const updateList = (list) => {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(list));
};

export const getList = () => {
  const list = localStorage.getItem(LOCAL_STORAGE_NAME);

  if (list) {
    return JSON.parse(list);
  }
};