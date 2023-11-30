//사용자 프로필 관련 API
// sendPost 함수를 밖으로 빼서 별도의 모듈로 관리하는 것이 좋습니다.
async function sendPost() {
  try {
    const res = await fetch('https://itsop.shop/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        name: 'abcd',
        address: '경기도 성남시 분당구 성남대로 지하55',
        phone: '010-1234-5678',
      }),
    });

    const data = await res.json();
    console.log(data);
    // Response 객체가 아니라 data를 반환하도록 수정
    return data;
  } catch (error) {
    console.error('Error in sendPost:', error);
    // 오류 발생 시 에러 객체 반환
    return error;
  }
}
export function getProfile(id: number) {
  const dumyData: any = [
    {
      id: 0,
      name: '오리동햄버거마스터',
      address: '오리동 맥도날드 1번자리',
      image_url:
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

      rating: 5,
    },
    {
      id: 1,
      name: '백엔드개발자',
      address: '판교 개발 본사',
      image_url:
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

      rating: -200,
    },
  ];

  return dumyData[id];
}

export async function getData() {
  const res = await fetch('http://localhost:8080/users/1');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
