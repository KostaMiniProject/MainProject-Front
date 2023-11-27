import { getItemDetailById } from '@/api/ItemApi';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import Image from 'next/image';
import React from 'react';

function Page() {
  const detail = getItemDetailById(1);

  if (!detail) {
    // detail이 유효하지 않은 경우에 대한 처리
    return <div>Error loading item details</div>;
  }

  // detail.image_url이 배열 형태로 제공되지 않는다면 수정 필요
  const images =
    'https://kosta-main-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20231127_174618039.png';

  return (
    <div>
      <Header title="아이템 상세">{/* 헤더 아이콘 */}</Header>
      <div className="h-[360px]">
        <Carousel images={detail.image_url} />
      </div>
      <Profile profile={detail.profile} />
      <Image key={1} src={images} width={60} height={60} alt={`Image`} />
    </div>
  );
}

export default Page;
