//사용자 프로필 관련 API
'use client';
import { commonFetch } from './commonApi/CommonFetch';

export async function getMyItemList(page: number = 0) {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/items?page=${page}`,
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
      `https://wass.itsop.shop/api/exchange-posts/dibs/${userId}`,
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
      `https://wass.itsop.shop/api/users/histories?page=${page}`,
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
export async function getMyProfile() {
  try {
    const result = await commonFetch(`https://wass.itsop.shop/api/users`, {
      method: 'GET',
      checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
      // 기타 다른 옵션들...
    });

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function putEditUser(formData: FormData) {
  try {
    const result = await commonFetch('https://wass.itsop.shop/api/users', {
      method: 'PUT',
      body: formData,
      checkToken: true, // 토큰 체크 활성화
    });

    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Error uploading:', error);
    throw error;
  }
}
export async function getProfileById(name: string) {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/users/profile?name=${name}`,
      {
        method: 'GET',
        // checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
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
