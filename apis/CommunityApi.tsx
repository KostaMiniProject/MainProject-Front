'use client';
import { commonFetch } from './commonApi/CommonFetch';

export async function getCommunityPost(page: number = 0) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/community-posts?page=${page}`,
      {
        method: 'GET',
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function postCommunityPost(formData: FormData) {
  try {
    const result = await commonFetch('https://itsop.shop/api/community-posts', {
      method: 'POST',
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
export async function putCommunityPostLike(postId: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/community-posts/likes/${postId}`,
      {
        method: 'PUT',
        checkToken: true, // 토큰 체크 활성화
      }
    );

    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Error uploading:', error);
    throw error;
  }
}
