'use client';
import { getProfile } from '@/api/ProfileApi';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import TempImg from '@/image/Logo.png';

function Page({ params }: { params: any }) {
  const images = [TempImg, TempImg, TempImg]; // 이미지 배열
  return (
    <div>
      <Carousel images={images} />
      <Profile profile={getProfile()} />
    </div>
  );
}

export default Page;
