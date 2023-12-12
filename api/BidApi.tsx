//입찰 리스트 관련 API
import { getCookie } from './Cookie';

export async function getBidItemList(id: number) {
  try {
    // const token = getCookie('token');
    // 토큰을 쿠키에서 가져오기

    const res = await fetch(
      `https://itsop.shop/api/exchange-posts/bids/${id}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          // 기타 필요한 헤더도 추가할 수 있습니다.
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();
    console.log(data);
    // Response 객체가 아니라 data를 반환하도록 수정
    return data;
  } catch (error) {
    console.error('Error in getPostList:', error);
    // 오류 발생 시 에러 객체 반환
    return error;
  }
}
// export function getBidList() {
//   const dumyData: any = [
//     {
//       id: 0,
//       name: '오리동햄버거마스터',
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       items: '키보드, 마우스, 모니터',
//     },
//     {
//       id: 1,
//       name: '김독자',
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       items: '클립, 핀셋',
//     },
//     {
//       id: 2,
//       name: '홍길도옹',
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       items: '안경, 귀마개',
//     },
//   ];

//   return dumyData;
// }

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
