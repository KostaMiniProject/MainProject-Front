'use client';
import React from 'react';
import Image from 'next/image';
import { MdCancel } from 'react-icons/md';
import TempImg from '@/image/Logo.png';

interface bidType {
  id: number;
  name: string;
  items: string;
}
function BidItem({ bid }: { bid: bidType }) {
  return (
    <div>
      <div className=" relative bg-white p-[2.5px] rounded-[5px] border-solid border-gray border-[1px]">
        <div className="absolute right-0 m-[5px]">
          <MdCancel size={30} />
        </div>
        <Image src={TempImg} alt="대표이미지" className="w-[100%] h-[170px]" />
        <div className="font-[600] text-[18px]">{bid.items}</div>
        <div className="text-gray">{bid.name}</div>
        <div className="bg-base text-center text-[18px] font-[600] text-white rounded-[5px]">
          대화하기
        </div>
      </div>
    </div>
  );
}

export default BidItem;
