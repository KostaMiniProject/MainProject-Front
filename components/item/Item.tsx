import Image from 'next/image';
import React from 'react';

export interface itemType {
  itemId: number;
  title: string;
  description: string;
  images: any;
  createdAt: string;
}
function Item({ item }: { item: itemType }) {
  return (
    <div className="flex border-solid border-gray border-[0.5px] mt-[10px] rounded-[5px]">
      <div className="relative w-[80px] h-[80px] overflow-hidden my-[10px] mx-[10px]">
        <Image
          src={item.images[0]}
          alt="Item image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
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
