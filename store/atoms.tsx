import { atom, selector } from 'recoil';

export const token = atom({
  key: 'token',
  default: '',
});

export const userId = atom({
  key: 'userId',
  default: -1,
});

export const navState = atom({
  key: 'navState',
  default: '물물교환',
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
