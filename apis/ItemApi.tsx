//입찰 아이템 상세 리스트 관련 API
'use client';
import { getCookie } from './Cookie';
import { commonFetch } from './commonApi/CommonFetch';
export async function postItem(formData: FormData) {
  const token = getCookie('token');
  const res = await fetch('https://itsop.shop/api/items', {
    method: 'POST',
    body: formData,
    headers: {
      // 토큰이 있다면 추가하세요
      Authorization: `${token}`,
      // 'Content-Type': 'multipart/form-data',
    },
  })
    .then((data) => {
      console.log('Upload successful:', data);
      // 성공적으로 업로드되었을 때 처리
    })
    .catch((error) => {
      console.error('Error uploading:', error);
      // 업로드 중 에러 발생 시 처리
    });
}
export async function getItemList() {
  try {
    const result = await commonFetch('https://itsop.shop/api/items/my-items', {
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

export async function getItemById(id: number | string) {
  try {
    // 토큰을 쿠키에서 가져오기
    const token = getCookie('token');

    const res = await fetch(`https://itsop.shop/api/items/${id}`, {
      headers: {
        Authorization: `${token}`,
        // 기타 필요한 헤더도 추가할 수 있습니다.
        'Content-Type': 'application/json',
      },
    });

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

// export function getItemList() {
//   const dumyData: any = [
//     {
//       id: 0,
//       title: '클립',
//       description: `물건 상태가 좋을 뿐더러 깨끗하게 닦에서 빛이납니다`,
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       created_at: '2023-11-24',
//     },
//     {
//       id: 1,
//       title: '모니터',
//       description: `조금 기스가 있지만 작동은 합니다`,
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       created_at: '2023-11-24',
//     },
//     {
//       id: 2,
//       title: '안경',
//       description: `렌즈가 다 뽀사져서 테만 남았어요`,
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
//       created_at: '2023-11-24',
//     },
//   ];

//   return dumyData;
// }

export async function getItemDetailById(id: number) {
  try {
    const result = await commonFetch(`https://itsop.shop/api/items/${id}`, {
      method: 'GET',
      // checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
      // 기타 다른 옵션들...
    });

    // const data = await res.json();
    console.log(result);
    // Response 객체가 아니라 data를 반환하도록 수정
    return result;
  } catch (error) {
    console.error('Error in getPostList:', error);
    // 오류 발생 시 에러 객체 반환
    return error;
  }
}
export async function deleteItemById(id: number) {
  try {
    const result = await commonFetch(`https://itsop.shop/api/items/${id}`, {
      method: 'DELETE',
      checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
      // 기타 다른 옵션들...
    });

    // const data = await res.json();
    console.log(result);
    // Response 객체가 아니라 data를 반환하도록 수정
    return result;
  } catch (error) {
    console.error('Error in getPostList:', error);
    // 오류 발생 시 에러 객체 반환
    return error;
  }
}
export async function getCategoryList() {
  try {
    const result = await commonFetch('https://itsop.shop/api/category', {
      method: 'GET',
      // checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
      // 기타 다른 옵션들...
    });

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
