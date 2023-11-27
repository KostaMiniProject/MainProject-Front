'use client';
import React from 'react';
import Image from 'next/image';
import { MdCancel } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';

interface bidType {
  id: number;
  name: string;
  image_url: string;
  items: string;
}
function BidItem({ bid, postOwner }: { bid: bidType; postOwner: boolean }) {
  const router = useRouter();
  const currentPath = usePathname();
  return (
    <div>
      <div className=" relative bg-white p-[2.5px] rounded-[5px] border-solid border-gray border-[1px]">
        <div
          onClick={() => {
            router.push(`/bid/${bid.id}`);
          }}
        >
          {/* 거절 버튼 */}
          {postOwner ? (
            <div className="absolute right-0 m-[5px]">
              <MdCancel size={30} />
            </div>
          ) : (
            <></>
          )}

          {/* 이미지표시 */}
          <Image
            src={bid.image_url}
            alt="대표이미지"
            className="w-[100%] h-[170px]"
          />
          <div className="font-[600] text-[18px]">{bid.items}</div>
          <div className="text-gray">{bid.name}</div>
        </div>
        {/* 대화하기 버튼 */}
        {postOwner ? (
          <div className="bg-base text-center text-[18px] font-[600] text-white rounded-[5px]">
            대화하기
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BidItem;
