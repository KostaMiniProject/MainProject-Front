import { atom } from 'recoil';

export const token = atom({
  key: 'token',
  default: '',
});

export const userId = atom({
  key: 'userId',
  default: -1,
});
