// commonFetch.ts 파일

import { getCookie } from '../Cookie';

interface RequestOptions {
  method: string;
  headers?: { [key: string]: string };
  body?: any;
  checkToken?: boolean;
}

export async function commonFetch(
  url: string,
  options: RequestOptions
): Promise<any> {
  try {
    // checkToken 옵션이 true이고, 토큰이 있는 경우에만 토큰을 추가
    if (options.checkToken) {
      const token = getCookie('token');

      if (token) {
        // 토큰이 있는 경우에만 헤더에 추가
        options.headers = {
          ...options.headers,
          Authorization: `${token}`,
        };
      }
    }

    // POST 메서드일 때 body가 있는 경우에만 body 추가
    if (
      (options.method === 'POST' && options.body) ||
      (options.method === 'PUT' && options.body)
    ) {
      options.body = JSON.stringify(options.body);
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      // 오류 응답 처리
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in commonFetch:', error);
    throw error;
  }
}
