//교환 게시글 관련 API

export async function sendPost() {
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
export async function getPostList() {
  try {
    const res = await fetch('https://itsop.shop/api/exchange-posts');

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
export async function getExchangePost(postId: number) {
  try {
    const res = await fetch(`https://itsop.shop/api/exchange-posts/${postId}`);

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
// export function getExchangePostList() {
//   const dumyData: any = [
//     {
//       id: 0,
//       title: '안쓰는 키보드랑 교환 할 사람',
//       prefer_items: '성능좋은 헤드셋',
//       address: '오리동 오리건물',
//       created_at: '2023-11-22',
//       status: 'exchanging',
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       bid_count: 5,
//     },
//     {
//       id: 1,
//       title: '깨끗한 지갑',
//       prefer_items: '비니',
//       address: '천호동 로데오',
//       created_at: '2023-11-23',
//       status: 'raservation',
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       bid_count: 2,
//     },
//     {
//       id: 2,
//       title: '바지',
//       prefer_items: '옷',
//       address: '암사동',
//       created_at: '2023-11-24',
//       status: 'completed',
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       bid_count: 7,
//     },
//     {
//       id: 3,
//       title: '바지',
//       prefer_items: '옷',
//       address: '암사동',
//       created_at: '2023-11-24',
//       status: 'deleted',
//       image_url:
//         'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//       bid_count: 7,
//     },
//   ];

//   return dumyData;
// }
// export function getCategory() {
//   const dumyCategory: any = [
//     '가전',
//     '의류',
//     '생활용품',
//     '자동차용품',
//     '아기용품',
//     '중고물품',
//   ];
//   return dumyCategory;
// }
// export function getExchangePost(id: number) {
//   const dumyData: any = [
//     {
//       post_owner: false,
//       title: `이거랑 교환 하실분`,
//       prefer_items: '압정',
//       address: '오리역',
//       content: `상태좋음 빠르게 교환 하실분`,
//       profile: {
//         id: 0,
//         name: '오리동햄버거마스터',
//         address: '오리동 맥도날드 1번자리',
//         image_url:
//           'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
//         rating: 5,
//       },
//       item: {
//         title: '클립',
//         description: '상태좋음',
//         image_url: [
//           'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
//           'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
//           'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',
//         ],
//       },
//       bid_list: [
//         {
//           id: 0,
//           name: '오리동햄버거마스터',
//           image_url:
//             'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//           items: '키보드, 마우스, 모니터',
//         },
//         {
//           id: 1,
//           name: '김독자',
//           image_url:
//             'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/dc96affa876561ed5074203f5ee982e4.jpg',

//           items: '클립, 핀셋',
//         },
//       ],
//     },
//   ];
//   return dumyData[id];
// }
