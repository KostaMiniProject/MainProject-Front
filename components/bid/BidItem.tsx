import React from 'react';
import Image from 'next/image';
import { MdCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface bidType {
  id: number;
  name: string;
  imageUrl: string;
  items: string;
}

function BidItem({
  bid,
  postOwner = false,
}: {
  bid: bidType;
  postOwner?: boolean;
}) {
  return (
    <div>
      <div className="relative py-[5px] bg-white  border-solid border-b-[0.5px] border-gray flex">
        {/* 이미지표시 */}
        <div className="relative overflow-hidden z-0">
          <div className="relative w-[80px] h-[80px] overflow-hidden">
            <Image
              src={bid.imageUrl}
              alt="대표이미지"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div>
          <div className="font-[600] text-header whitespace-nowrap text-ellipsis overflow-hidden">
            {bid.items}
          </div>
          <div className="text-gray text-title whitespace-nowrap text-ellipsis overflow-hidden">
            {bid.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BidItem;
