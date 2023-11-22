'use client';
import React from 'react';
import Scarch from '@/components/Search';
import ExchangePost from '@/components/exchange/ExchangePost';

function Page() {
  const dumyData: any = [
    {
      id: 0,
      title: '안쓰는 키보드랑 교환 할 사람',
      prefer_items: '성능좋은 헤드셋',
      address: '오리동 오리건물',
      created_at: '2023-11-22',
      status: 'exchanging',
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
      id: 3,
      title: '바지',
      prefer_items: '옷',
      address: '암사동',
      created_at: '2023-11-24',
      status: 'deleted',
      bid_count: 7,
    },
    {
      id: 2,
      title: '비닐봉지',
      prefer_items: '클립',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'completed',
      bid_count: 3,
    },
    {
      id: 2,
      title: '비닐봉지',
      prefer_items: '클립',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'completed',
      bid_count: 3,
    },
    {
      id: 2,
      title: '비닐봉지',
      prefer_items: '클립',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'completed',
      bid_count: 3,
    },
    {
      id: 2,
      title: '비닐봉지',
      prefer_items: '클립',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'completed',
      bid_count: 3,
    },
    {
      id: 2,
      title: '비닐봉지',
      prefer_items: '클립',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'completed',
      bid_count: 3,
    },
    {
      id: 2,
      title: '비닐봉지',
      prefer_items: '클립',
      address: '천호동 로데오',
      created_at: '2023-11-23',
      status: 'completed',
      bid_count: 3,
    },
  ];
  return (
    <div>
      <Scarch />
      {/* 컨텐츠 */}
      <div className="mx-[15px]">
        {/* 카테고리 */}
        <div className="bg-white flex">
          <div>카테고리1</div>
          <div>카테고리2</div>
          <div>카테고리3</div>
        </div>
        {/* ExchangePost 리스트 */}
        <div>
          {dumyData.map((e: any) => {
            return e.status !== 'deleted' ? <ExchangePost bid={e} /> : <></>;
          })}
        </div>
      </div>
      <div className="sticky  bottom-[115px]">
        <div className="mx-[20px] bg-base rounded-[25px] inline-block float-right py-[10px] px-[15px] text-white font-[600]">
          + 글 쓰기
        </div>
      </div>
    </div>
  );
}

export default Page;
