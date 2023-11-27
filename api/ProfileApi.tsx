//사용자 프로필 관련 API
export function getProfile(id: number) {
  const dumyData: any = [
    {
      id: 0,
      name: '오리동햄버거마스터',
      address: '오리동 맥도날드 1번자리',
      image_url: '',
      rating: 5,
    },
    {
      id: 1,
      name: '백엔드개발자',
      address: '판교 개발 본사',
      image_url: '',
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
