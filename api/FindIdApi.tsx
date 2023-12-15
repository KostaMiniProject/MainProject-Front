export async function findId(userData: any) {
    try {
      const result = await fetch('https://itsop.shop/api/find-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!result.ok) {
        // 서버에서 오류 응답이 왔을 때 '/fail'로 이동
        console.error('아이디 찾기 요청이 실패했습니다.');
        throw new Error('아이디 찾기에 실패했습니다.');
      }
  
      const responseData = await result.json();
      console.log('Fetched data:', responseData);
  
      return responseData;
    } catch (error) {
      // 오류 처리
      console.error('아이디 찾던 중 오류 발생:', error);
      throw error; // 호출자에게 오류 전파
    }
  }