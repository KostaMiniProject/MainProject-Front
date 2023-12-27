import React from 'react';
import { MdOutlineListAlt } from 'react-icons/md';

import Image from 'next/image';

enum status {
  a = 'EXCHANGING',
  b = 'RESERVATION',
  c = 'COMPLETED',
  d = 'DELETED',
}
interface BidType {
  exchangePostId: number;
  title: string;
  preferItem: string;
  address: string;
  createdAt: string;
  exchangePostStatus: string;
  imgUrl?: string;
  bidCount: number;
}
function ExchangePost({ bid }: { bid: BidType }) {
  function statusElement() {
    if (bid.exchangePostStatus === 'RESERVATION') {
      return (
        <div className="w-full  bg-gray opacity-95 text-center absolute bottom-0 justify-center flex flex-col">
          <div className="text-title text-white">예약중</div>
        </div>
      );
    } else if (bid.exchangePostStatus === 'COMPLETED') {
      return (
        <div className="w-full h-full bg-gray opacity-70 text-center justify-center flex flex-col">
          <div className="">거래 완료</div>
        </div>
      );
    }
    return;
  }
  return (
    <div className=" flex py-[5px] border-b-[0.5px] border-gray">
      <div className="relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px] rounded-[8px]">
        {bid.imgUrl && (
          <Image
            src={bid.imgUrl}
            alt="Item image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        )}
        {statusElement()}
      </div>
      {/* 우측 데이터부분 */}
      <div className="relative flex-1 px-[5px] flex-col flex justify-between whitespace-nowrap text-ellipsis overflow-hidden">
        <div>
          {/* 타이틀 */}
          <div className="font-[800] text-title leading-none text-ellipsis overflow-hidden">
            {bid.title}
          </div>
          {/* 주소 */}
          <div className="text-gray text-subtitle leading-none">
            {bid.address}
          </div>
        </div>

        {/* 게시날짜와 입찰 수 */}
        <div className="flex justify-between absolute bottom-0   right-0">
          <div className="flex">
            <div className="text-gray mr-[10px] text-subtitle">
              {bid.createdAt}
            </div>
          </div>
          <div className="flex">
            {/* 입찰 수 */}
            <div className="flex items-center">
              <MdOutlineListAlt size={13} />
              <div className="text-subtitle">{bid.bidCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangePost;
