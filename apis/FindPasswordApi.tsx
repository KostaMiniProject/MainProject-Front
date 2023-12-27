'use client';
export async function findPassword(userData: any) {
  try {
    const result = await fetch('https://wass.itsop.shop/api/find-password', {
      method: 'PUT',
=======
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!result.ok) {
      // 서버에서 오류 응답이 왔을 때 '/fail'로 이동
      console.error('비밀번호 찾기 요청이 실패했습니다.');
      throw new Error('비밀번호 찾기에 실패했습니다.');
    }
    //반환받는 값이 없어서 할필요는 없으나 일단남겨둠... ㅠㅠ
    const responseData = await result.json();
    console.log('Fetched data:', responseData);

    return responseData;
  } catch (error) {
    // 오류 처리
    console.error('비밀번호 찾던 중 오류 발생:', error);
    throw error; // 호출자에게 오류 전파
  }
}
