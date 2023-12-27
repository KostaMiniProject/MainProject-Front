'use client';
import { commonFetch } from './commonApi/CommonFetch';

export async function getBlockedUsers() {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/users/blocked`,
      {
        method: 'GET',
        checkToken: true, // 토큰 체크 활성화
        // 기타 다른 옵션들...
      }
    );

    // console.log(
    //   "Fetched data:",
    //   result,
    //   "Profile Image:",
    //   result.profileImage,
    //   "Name:",
    //   result.name
    // );
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function putBlockUser(userId: string) {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/users/block/${userId}`,
      {
        method: 'PUT',
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
