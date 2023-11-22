import React from 'react';
import Image from 'next/image';
import { MdOutlineListAlt } from 'react-icons/md';

import TempImg from '@/image/Logo.png';

enum status {
  a = 'exchanging',
  b = 'raservation',
  c = 'completed',
  d = 'deleted',
}
interface BidType {
  id: number;
  title: string;
  prefer_items: string;
  address: string;
  created_at: string;
  status: string;
  bid_count: number;
}
function ExchangePost({ bid }: { bid: BidType }) {
  return (
    <div className="border-gray border-[0.5px] rounded-[5px] flex my-[5px]">
      <Image
        src={TempImg}
        alt="Item image"
        className="w-[80px] h-[80px] my-[10px] ml-[10px]"
      />
      {/* 우측 데이터부분 */}
      <div className="my-[10px] w-[100%] mx-[10px] flex-col justify-between">
        {/* 타이틀 */}
        <div className="font-[800] text-[24px] leading-none">{bid.title}</div>
        {/* 주소 */}
        <div className="text-gray text-[16px] leading-none">{bid.address}</div>
        {/* 원하는물건 */}
        <div className="font-[600] leading-none">{bid.prefer_items}</div>
        {/* 게시날짜와 입찰 수 */}
        <div className="flex justify-between">
          <div className="flex">
            {/* 게시날짜 */}
            <div className="text-gray mr-[10px]">{bid.created_at}</div>
            {bid.status === status.b ? (
              <div className="bg-base text-white rounded-[15px] px-[10px]">
                예약중
              </div>
            ) : bid.status === status.c ? (
              <div className="bg-gray text-white rounded-[15px] px-[10px]">
                거래완료
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex">
            {/* 입찰 수 */}
            <div className="flex items-center">
              <MdOutlineListAlt />
              <div>{bid.bid_count}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangePost;
