//교환 게시글 관련 API
'use client';
import { commonFetch } from './commonApi/CommonFetch';

export async function postExchangePost(jsonData: any) {
  try {
    const result = await commonFetch('https://itsop.shop/api/exchange-posts', {
      method: 'POST',
      checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
      body: jsonData,
      // 기타 다른 옵션들...
    });

    console.log('Fetched data:', result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function getPostList(page: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts?page=${page}`,
      {
        method: 'GET',
      }
    );
    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function getMyPostList(page: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/users/exchange-post-list?page=${page}`,
      {
        method: 'GET',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
      }
    );
    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function getSearchPostList(page: number, keyword: string) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/search?page=${page}&keyword=${keyword}`,
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

export async function getExchangePost(postId: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/${postId}`,
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
export async function updateExchangePost(jsonData: any, postId: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/${postId}`,
      {
        method: 'PUT',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        body: jsonData,
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function deleteExchangePost(postId: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/${postId}`,
      {
        method: 'DELETE',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postdib(postId: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/${postId}/dibs`,
      {
        method: 'POST',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
