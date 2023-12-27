'use client';
export async function postSignUp(userData: any) {
  try {
    const res = await fetch('https://wass.itsop.shop/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      // 로그인 실패 처리
      throw new Error(`로그인 실패: ${res.status}`);
    }

    const data = await res.json();
    // 토큰을 반환하거나 저장, 사용 등을 수행

    return [data];
  } catch (error) {
    // 오류 처리
    console.error('로그인 중 오류 발생:', error);
    throw error; // 호출자에게 오류 전파
  }
}

export async function putSignUp(userData: any) {
  try {
    const res = await fetch('https://wass.itsop.shop/api/oauth-signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      // 로그인 실패 처리
      throw new Error(`로그인 실패: ${res.status}`);
    }

    const data = await res.json();
    // 토큰을 반환하거나 저장, 사용 등을 수행

    return [data];
  } catch (error) {
    // 오류 처리
    console.error('로그인 중 오류 발생:', error);
    throw error; // 호출자에게 오류 전파
  }
}
