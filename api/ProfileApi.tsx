//사용자 프로필 관련 API

import { commonFetch } from './commonApi/CommonFetch';

export async function getMyItemList(page: number = 0) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/items?page=${page}`,
      {
        method: 'GET',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function getMyDibs(userId: number = 0) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/dibs/${userId}`,
      {
        method: 'GET',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function getMyHistory(page: number = 0) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/users/histories?page=${page}`,
      {
        method: 'GET',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
