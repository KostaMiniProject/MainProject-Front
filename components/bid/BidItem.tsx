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
  const router = useRouter();
  return (
    <div>
      <div className="relative bg-white p-[2.5px] rounded-[5px] border-solid border-gray border-[1px]">
        <div
          onClick={(e) => {
            router.push(`/bid/${bid.id}`);
          }}
        >
          {/* 거절 버튼 */}
          {postOwner ? (
            <div
              className="absolute right-0 m-[5px] z-10"
              onClick={(e) => {
                e.stopPropagation();
                alert('asdf');
              }}
            >
              <MdCancel size={30} />
            </div>
          ) : (
            <></>
          )}

          {/* 이미지표시 */}
          <div className="relative pb-[100%] overflow-hidden z-0">
            <Image
              src={bid.imageUrl}
              alt="대표이미지"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="font-[600] text-[18px] whitespace-nowrap text-ellipsis overflow-hidden">
            {bid.items}
          </div>
          <div className="text-gray whitespace-nowrap text-ellipsis overflow-hidden">
            {bid.name}
          </div>
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
