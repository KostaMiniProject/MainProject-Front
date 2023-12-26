import Image from 'next/image';
import React from 'react';

export interface itemType {
  itemId?: number;
  title: string;
  description: string;
  images?: any;
  imageUrls?: any;
  createdAt?: string;
  isBiding?: string;
}
function Item({ item }: { item: itemType }) {
  return (
    <div className="flex border-solid border-gray border-b-[0.5px] p-[5px]">
      <div className="relative w-[60px] h-[60px] overflow-hidden rounded-[5px]">
        {item.images ? (
          <Image
            src={item.images[0]}
            alt="Item image"
            sizes="(max-width: 768px) 100vw"
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : item.imageUrls ? (
          <Image
            src={item.imageUrls[0]}
            alt="Item image"
            sizes="(max-width: 768px) 100vw"
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="my-[5px]">
        <div className="font-[600] text-header leading-none">{item.title}</div>
        <div className="text-gray text-title">
          <div>{item.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Item;
