export async function Login(username: string, password: string) {
  try {
    const res = await fetch('https://itsop.shop/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!res.ok) {
      // 로그인 실패 처리
      throw new Error(`로그인 실패: ${res.status}`);
    }

    // 로그인 성공 시, 토큰 추출 및 반환
    const data = await res.json();
    const token = data.access_token;
    return token;
  } catch (error) {
    // 오류 처리
    console.error('로그인 중 오류 발생:', error);
    throw error; // 호출자에게 오류 전파
  }
}
