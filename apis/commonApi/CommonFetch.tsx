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
    if (options.checkToken) {
      const token = getCookie('token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `${token}`,
        };
      }
    }

    // FormData의 경우, Content-Type을 설정하지 않습니다
    if (!(options.body instanceof FormData)) {
      if (options.method === 'POST' || options.method === 'PUT') {
        options.body = JSON.stringify(options.body);
        options.headers = {
          ...options.headers,
          'Content-Type': 'application/json',
        };
      }
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      // 오류 응답 처리
      throw new Error(`Request failed with status ${response.status}`);
    }

    // return await response;
    return await response.json();
  } catch (error) {
    console.error('Error in commonFetch:', error);
    throw error;
  }
}
