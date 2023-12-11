import { getCookie } from './Cookie';

export async function Login(email: string, password: string) {
  try {
    const res = await fetch('https://itsop.shop/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!res.ok) {
      // 로그인 실패 처리
      throw new Error(`로그인 실패: ${res.status}`);
    }

    // 응답 헤더에서 토큰 추출
    // const token = res.headers.get('Authorization');
    const token = getCookie('Authorization');
    console.log('토큰값');
    console.log(token);
    const data = await res.json();
    // 토큰을 반환하거나 저장, 사용 등을 수행
    // document.cookie = `token=${token}; path=/;`;
    document.cookie = `userId=${data.userId}; path=/;`;

    return [token, data.userId];
  } catch (error) {
    // 오류 처리
    console.error('로그인 중 오류 발생:', error);
    throw error; // 호출자에게 오류 전파
  }
}

export async function testLogin(email: string, password: string) {
  try {
    const res = await fetch(
      'https://f585-121-165-125-220.ngrok-free.app/token/expire/1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (!res.ok) {
      // 로그인 실패 처리
      throw new Error(`로그인 실패: ${res.status}`);
    }

    // 응답 헤더에서 토큰 추출
    const token = res.headers.get('Authorization');
    const data = await res.json();
    // 토큰을 반환하거나 저장, 사용 등을 수행
    document.cookie = `token=${token}; path=/;`;
    document.cookie = `userId=${data.userId}; path=/;`;

    return [token, data.userId];
  } catch (error) {
    // 오류 처리
    console.error('로그인 중 오류 발생:', error);
    throw error; // 호출자에게 오류 전파
  }
}
