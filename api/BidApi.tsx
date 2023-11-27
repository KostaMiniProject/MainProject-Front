//입찰 리스트 관련 API
export function getBidList() {
  const dumyData: any = [
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
    {
      id: 2,
      name: '홍길도옹',
      image_url: '',
      items: '안경, 귀마개',
    },
  ];

  return dumyData;
}

export function getBidById(id: number) {
  const dumyData: any = [
    {
      owner: true,
      item_list: [
        {
          id: 0,
          title: '클립',
          description: `물건 상태가 좋을 뿐더러 깨끗하게 닦에서 빛이납니다`,
          image_url: '',
          created_at: '2023-11-24',
        },
        {
          id: 1,
          title: '모니터',
          description: `조금 기스가 있지만 작동은 합니다`,
          image_url: '',
          created_at: '2023-11-24',
        },
      ],
    },
    {
      owner: false,
      item_list: [
        {
          id: 1,
          title: '모니터',
          description: `조금 기스가 있지만 작동은 합니다`,
          image_url: '',
          created_at: '2023-11-24',
        },
        {
          id: 2,
          title: '안경',
          description: `렌즈가 다 뽀사져서 테만 남았어요`,
          image_url: '',
          created_at: '2023-11-24',
        },
      ],
    },
    {
      owner: false,
      item_list: [
        {
          id: 1,
          title: '모니터',
          description: `조금 기스가 있지만 작동은 합니다`,
          image_url: '',
          created_at: '2023-11-24',
        },
        {
          id: 2,
          title: '안경',
          description: `렌즈가 다 뽀사져서 테만 남았어요`,
          image_url: '',
          created_at: '2023-11-24',
        },
        {
          id: 0,
          title: '클립',
          description: `물건 상태가 좋을 뿐더러 깨끗하게 닦에서 빛이납니다`,
          image_url: '',
          created_at: '2023-11-24',
        },
      ],
    },
  ];

  return dumyData[id];
}
