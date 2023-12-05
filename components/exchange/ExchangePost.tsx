import React from 'react';
import { MdOutlineListAlt } from 'react-icons/md';

import Image from 'next/image';

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
  imgUrl: string;
  bidCount: number;
}
function ExchangePost({ bid }: { bid: BidType }) {
  return (
    <div className=" flex my-[5px] ">
      <div className="relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px]">
        <Image
          src={bid.imgUrl}
          alt="Item image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {/* 우측 데이터부분 */}
      <div className=" flex-1 px-[5px] flex-col whitespace-nowrap text-ellipsis overflow-hidden">
        {/* 타이틀 */}
        <div className="font-[800] text-[16px] leading-none ">{bid.title}</div>
        {/* 주소 */}
        <div className="text-gray text-[12px] leading-none">{bid.address}</div>
        {/* 원하는물건 */}
        <div className="font-[600] leading-none">
          <div className="flex text-[12px]">
            {bid.prefer_items}
            {/* 스테이트에 따른 상태표시 */}
            {bid.status === status.b ? (
              <div className="bg-base text-white rounded-[15px] px-[10px] text-[14px]">
                예약중
              </div>
            ) : bid.status === status.c ? (
              <div className="bg-gray text-white rounded-[15px] px-[10px] text-[14px]">
                거래완료
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* 게시날짜와 입찰 수 */}
        <div className="flex justify-between">
          <div className="flex">
            {/* 게시날짜 */}
            <div className="text-gray mr-[10px]">{bid.created_at}</div>
          </div>
          <div className="flex">
            {/* 입찰 수 */}
            <div className="flex items-center">
              <MdOutlineListAlt />
              <div>{bid.bidCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangePost;
