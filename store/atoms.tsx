import { atom, selector } from 'recoil';

export const token = atom({
  key: 'token',
  default: '',
});

export const userId = atom({
  key: 'userId',
  default: -1,
});

export const isToken = selector({
  key: 'isToken',
  get: ({ get }) => {
    if (get(token) !== '') {
      return true;
    } else {
      return false;
    }
  },
});
