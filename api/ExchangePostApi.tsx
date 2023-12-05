//교환 게시글 관련 API

import { getCookie } from './Cookie';

// export async function sendPost() {
//   try {
//     const res = await fetch('https://itsop.shop/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: 'abcd@gmail.com',
//         name: 'abcd',
//         address: '경기도 성남시 분당구 성남대로 지하55',
//         phone: '010-1234-5678',
//       }),
//     });

//     const data = await res.json();
//     console.log(data);
//     // Response 객체가 아니라 data를 반환하도록 수정
//     return data;
//   } catch (error) {
//     console.error('Error in sendPost:', error);
//     // 오류 발생 시 에러 객체 반환
//     return error;
//   }
// }
export async function postExchangePost(jsonData: any) {
  try {
    const token = getCookie('token');

    const res = await fetch('https://itsop.shop/api/exchange-posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    const data = await res.json();
    console.log(data);
    // Response 객체가 아니라 data를 반환하도록 수정
    return data;
  } catch (error) {
    console.error('Error in sendPost:', error);
    // 오류 발생 시 에러 객체 반환
    return error;
  }
}
export async function getPostList(page: number) {
  try {
    // 토큰을 쿠키에서 가져오기
    // const token = getCookie('token');

    const res = await fetch(
      `https://itsop.shop/api/exchange-posts?page=${page}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          // 기타 필요한 헤더도 추가할 수 있습니다.
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();
    console.log(data);
    // Response 객체가 아니라 data를 반환하도록 수정
    return data;
  } catch (error) {
    console.error('Error in getPostList:', error);
    // 오류 발생 시 에러 객체 반환
    return error;
  }
}

export async function getExchangePost(postId: number) {
  try {
    // 토큰을 쿠키에서 가져오기
    const token = getCookie('token');

    const res = await fetch(`https://itsop.shop/api/exchange-posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 기타 필요한 헤더도 추가할 수 있습니다.
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);
    // Response 객체가 아니라 data를 반환하도록 수정
    return data;
  } catch (error) {
    console.error('Error in getExchangePost:', error);
    // 오류 발생 시 에러 객체 반환
    return error;
  }
}
