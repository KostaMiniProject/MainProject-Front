import Image from 'next/image';
import React from 'react';

import TempImg from '@/image/Logo.png';

interface itemType {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}
function Item({ item }: { item: itemType }) {
  return (
    <div className="flex border-solid border-gray border-[0.5px] mt-[10px] rounded-[5px]">
      <Image
        src={item.image_url}
        alt="아이템 이미지"
        className="w-[80px] h-[80px] my-[5px] mx-[5px]"
      />
      <div className="my-[5px]">
        <div className="font-[600] text-[24px] leading-none">{item.title}</div>
        <div className="text-gray text-[12px]">
          <div>{item.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Item;
