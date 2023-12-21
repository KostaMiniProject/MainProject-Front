'use client';
import { commonFetch } from './commonApi/CommonFetch';

export async function getChatRoomList() {
  try {
    // http://localhost:8080
    // https://itsop.shop
    const result = await commonFetch('https://itsop.shop/api/chatRooms', { 
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

export async function postCreateRoom(body: any) {
  try {
    const result = await commonFetch('https://itsop.shop/api/chatRooms', {
      method: 'POST',
      checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
      // 기타 다른 옵션들...
      body: body,
    });

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function putExchange(exchangePostId: number, bidId: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/${exchangePostId}/bids/${bidId}/reserve`,
      {
        method: 'PUT',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    // return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function deleteChattingRoom(chatRoomId: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/chatRooms/${chatRoomId}`,
      {
        method: 'DELETE',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    // return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function putExchangeComplete(
  exchangePostId: number,
  bidId: number
) {
  try {
    const result = await commonFetch(
      `https://a666-121-165-125-220.ngrok-free.app/api/exchange-posts/${exchangePostId}/bids/${bidId}/complete`,
      {
        method: 'PUT',
        checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    // return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
