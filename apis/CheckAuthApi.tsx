export async function postCheckAuth(body: any) {
  try {
    const res = await fetch('http://localhost:8080/api/oauth/check-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // 로그인 실패 처리
      throw new Error(`로그인 실패: ${res.status}`);
    }

    // 응답 헤더에서 토큰 추출
    // const token = getCookie('Set-Cookie');
    // console.log('토큰값');
    // 토큰을 반환하거나 저장, 사용 등을 수행

    return res;
  } catch (error) {
    // 오류 처리
    console.error('로그인 중 오류 발생:', error);
    throw error; // 호출자에게 오류 전파
  }
}
