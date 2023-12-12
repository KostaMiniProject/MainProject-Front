//입찰 리스트 관련 API
import { commonFetch } from './commonApi/CommonFetch';

export async function getBidItemList(id: number) {
  try {
    const result = await commonFetch(
      `https://itsop.shop/api/exchange-posts/bids/${id}`,
      {
        method: 'GET',
        // checkToken: true, // 이 옵션이 있는 경우에만 토큰이 추가됨
        // 기타 다른 옵션들...
      }
    );

    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
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
          image_url:
            'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

          created_at: '2023-11-24',
        },
        {
          id: 1,
          title: '모니터',
          description: `조금 기스가 있지만 작동은 합니다`,
          image_url:
            'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

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
          image_url:
            'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

          created_at: '2023-11-24',
        },
        {
          id: 2,
          title: '안경',
          description: `렌즈가 다 뽀사져서 테만 남았어요`,
          image_url:
            'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

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
          image_url:
            'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

          created_at: '2023-11-24',
        },
        {
          id: 2,
          title: '안경',
          description: `렌즈가 다 뽀사져서 테만 남았어요`,
          image_url:
            'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

          created_at: '2023-11-24',
        },
        {
          id: 0,
          title: '클립',
          description: `물건 상태가 좋을 뿐더러 깨끗하게 닦에서 빛이납니다`,
          image_url:
            'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

          created_at: '2023-11-24',
        },
      ],
    },
  ];

  return dumyData[id];
}
