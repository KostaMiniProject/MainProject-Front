//교환 게시글 관련 API
export function getExchangePostList() {
  const dumyData: any = [
    {
      id: 0,
      title: '안쓰는 키보드랑 교환 할 사람',
      prefer_items: '성능좋은 헤드셋',
      address: '오리동 오리건물',
      created_at: '2023-11-22',
      status: 'exchanging',
      image_url: '',
      bid_count: 5,
    },
    {
      id: 1,
      title: '깨끗한 지갑',
      prefer_items: '비니',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'raservation',
      image_url: '',
      bid_count: 2,
    },
    {
      id: 2,
      title: '바지',
      prefer_items: '옷',
      address: '암사동',
      created_at: '2023-11-24',
      status: 'completed',
      image_url: '',
      bid_count: 7,
    },
    {
      id: 3,
      title: '바지',
      prefer_items: '옷',
      address: '암사동',
      created_at: '2023-11-24',
      status: 'deleted',
      image_url: '',
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
export function getExchangePost(id: number) {
  const dumyData: any = [
    {
      post_owner: true,
      profile: {
        id: 0,
        name: '오리동햄버거마스터',
        address: '오리동 맥도날드 1번자리',
        image_url: '',
        rating: 5,
      },
      content: `상태좋음
    빠르게 교환 하실분`,
      bid_list: [
        {
          id: 0,
          name: '오리동햄버거마스터',
          image_url: '',
          items: '키보드, 마우스, 모니터',
        },
        {
          id: 1,
          name: '김독자',
          image_url: '',
          items: '클립, 핀셋',
        },
      ],
    },
    {
      post_owner: false,
      profile: {
        id: 1,
        name: '백엔드개발자',
        address: '판교 개발 본사',
        image_url: '',
        rating: -100,
      },
      content: `잡템
    바꿀사람`,
      bid_list: [
        {
          id: 1,
          name: '김독자',
          image_url: '',
          items: '클립, 핀셋',
        },
        {
          id: 2,
          name: '홍길도옹',
          image_url: '',
          items: '안경, 귀마개',
        },
      ],
    },
    {
      post_owner: false,
      profile: {
        id: 2,
        name: '김독자',
        address: '지구 어딘가의 한 장소',
        image_url: '',
        rating: 2934,
      },
      content: `나랑 교환 하실분`,
      bid_list: [
        {
          id: 1,
          name: '김독자',
          image_url: '',
          items: '클립, 핀셋',
        },
        {
          id: 2,
          name: '홍길도옹',
          image_url: '',
          items: '안경, 귀마개',
        },
      ],
    },
  ];
  return dumyData[id];
}
