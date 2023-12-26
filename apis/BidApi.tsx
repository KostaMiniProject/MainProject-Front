//입찰 리스트 관련 API
'use client';
import { commonFetch } from './commonApi/CommonFetch';

export async function getBidItemList(id: number) {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/exchange-posts/bids/${id}`,
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

export async function postBid(postId: number, body: any) {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/exchange-posts/${postId}/bids`,
      {
        method: 'POST',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
        body: body,
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function deleteBid(id: number) {
  try {
    const result = await commonFetch(
      `https://wass.itsop.shop/api/exchange-posts/bids/${id}`,
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
