export function getExchangePostList() {
  const dumyData: any = [
    {
      id: 0,
      title: '안쓰는 키보드랑 교환 할 사람',
      prefer_items: '성능좋은 헤드셋',
      address: '오리동 오리건물',
      created_at: '2023-11-22',
      status: 'exchanging',
      img_url: '',
      bid_count: 5,
    },
    {
      id: 1,
      title: '깨끗한 지갑',
      prefer_items: '비니',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'raservation',
      bid_count: 2,
    },
    {
      id: 2,
      title: '바지',
      prefer_items: '옷',
      address: '암사동',
      created_at: '2023-11-24',
      status: 'completed',
      bid_count: 7,
    },
    {
      id: 3,
      title: '바지',
      prefer_items: '옷',
      address: '암사동',
      created_at: '2023-11-24',
      status: 'deleted',
      bid_count: 7,
    },
  ];

  return dumyData;
}
export function getCategory() {
  const dumyCategory: any = [
    '가전',
    '의류',
    '생활용품',
    '자동차용품',
    '아기용품',
    '중고물품',
  ];
  return dumyCategory;
}
