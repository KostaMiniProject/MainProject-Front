'use client';
import { getProfile } from '@/api/ProfileApi';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import Image from 'next/image';
import TempImg from '@/image/Logo.png';
import BidItem from '@/components/bid/BidItem';
import { getBidList } from '@/api/BidApi';

function Page({ params }: { params: any }) {
  const images = [TempImg, TempImg, TempImg]; // 이미지 배열
  const bidList = getBidList();
  return (
    <div>
      <Carousel images={images} />
      <Profile profile={getProfile()} />
      <div className="flex flex-col m-[15px]">
        <div className="border-solid border-black border-[1px]">{`1.물건명
        2.개봉여부`}</div>
        <div className="flex">
          <div className="border-solid border-black border-[1px] flex-1 text-center">
            입찰 목록
          </div>
          <div className="border-solid border-black border-[1px] flex-1 text-center">
            거절 내역 보기
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 m-[15px]">
        {bidList.map((e: any, i: any) => (
          <BidItem bid={e} />
        ))}
      </div>
      <div className="h-[60px]"></div>
    </div>
  );
}

export default Page;
