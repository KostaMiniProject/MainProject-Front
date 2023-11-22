import React from 'react';
import Image from 'next/image';
import { MdOutlineListAlt } from 'react-icons/md';

import TempImg from '@/image/Logo.png';

function ExchangePost() {
  return (
    <div className="border-gray border-[0.5px] rounded-[5px] flex my-[5px]">
      <Image
        src={TempImg}
        alt="Item image"
        className="w-[80px] h-[80px] my-[10px] ml-[10px]"
      />
      <div className="my-[10px] w-[100%] mx-[10px] flex-col justify-between">
        <div className="font-[800] text-[24px] leading-none">
          물건 교환 원합니다.
        </div>
        <div className="text-gray text-[16px] leading-none">거래 상세 주소</div>
        <div className="font-[600] leading-none">원하는 물건</div>
        <div className="flex justify-between">
          <div className="text-gray">2023-11-22</div>
          <div className="flex items-center">
            <MdOutlineListAlt />
            <div>5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangePost;
