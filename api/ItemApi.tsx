//입찰 아이템 상세 리스트 관련 API

import { getCookie } from './Cookie';

// export async function getItemList() {
//   try {
//     // 토큰을 쿠키에서 가져오기
//     const token = getCookie('token');

//     const res = await fetch('https://itsop.shop/api/items', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         // 기타 필요한 헤더도 추가할 수 있습니다.
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await res.json();
//     console.log(data);
//     // Response 객체가 아니라 data를 반환하도록 수정
//     return data;
//   } catch (error) {
//     console.error('Error in getPostList:', error);
//     // 오류 발생 시 에러 객체 반환
//     return error;
//   }
// }

export function getItemList() {
  const dumyData: any = [
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
    {
      id: 2,
      title: '안경',
      description: `렌즈가 다 뽀사져서 테만 남았어요`,
      image_url:
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
      created_at: '2023-11-24',
    },
  ];

  return dumyData;
}

export function getItemDetailById(id: number) {
  const dumyData: any = [
    {
      id: 0,
      title: '클립',
      category: '사무용품',
      description: `물건 상태가 좋을 뿐더러 깨끗하게 닦에서 빛이납니다`,
      image_url: [
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
      ],

      profile: {
        id: 0,
        name: '오리동햄버거마스터',
        address: '오리동 맥도날드 1번자리',
        image_url:
          'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20231127_174618039.png',
        rating: 5,
      },
      created_at: '2023-11-24',
    },
    {
      id: 1,
      title: '모니터',
      category: '전자제품',
      description: `조금 기스가 있지만 작동은 합니다`,
      image_url: [
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
      ],

      profile: {
        id: 0,
        name: '오리동',
        address: '오리동 자리',
        image_url:
          'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20231127_174618039.png',
        rating: 5,
      },
      created_at: '2023-11-24',
    },
    {
      id: 2,
      title: '안경',
      category: '생활용품',
      description: `렌즈가 다 뽀사져서 테만 남았어요`,
      image_url: [
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
        'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
      ],

      profile: {
        id: 0,
        name: '햄버거마스터',
        address: '맥도날드 1번자리',
        image_url:
          'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20231127_174618039.png',
        rating: 5,
      },
      created_at: '2023-11-24',
    },
  ];

  return dumyData[id];
}
