import { commonFetch } from './commonApi/CommonFetch';

export async function deleteUser() {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/users/withdrawal`,
      {
        method: 'DELETE',
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
