import { getItemDetailById } from '@/api/ItemApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import Image from 'next/image';
import React from 'react';

function Page() {
  const detail = getItemDetailById(1);
  const images =
    'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20231127_174618039.png';

  return (
    <div>
      <Header title="아이템 상세">{/* 헤더 아이콘 */}</Header>
      <div className="h-[360px]">
        <Carousel images={detail.image_url} />
      </div>
      <Profile profile={detail.profile} />
      <div className="mx-[15px]">
        <div className="py-[5px] border-solid border-b-[0.5px] ">
          <div className="text-[25px] font-[600]">{detail.title}</div>
          <div className="flex">
            <Button text={detail.category} btnStyle="tag" height={5} />
          </div>
        </div>
        <div className="min-h-[300px] my-[5px] bg-softbase rounded-[5px] ">
          <div className="py-[5px] font-[600]">{detail.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
