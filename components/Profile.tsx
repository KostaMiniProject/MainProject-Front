import React from 'react';
import Image from 'next/image';
import { MdInsertEmoticon } from 'react-icons/md';
import TempImg from '@/image/Logo.png';
import { getData } from '@/api/ProfileApi';

interface profileType {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  rating: number;
}

// async function Profile({ profile }: { profile?: profileType }) {
function Profile({ profile }: { profile: profileType }) {
  // const data = await getData();
  // profile = {
  //   id: 0,
  //   name: 'unknown',
  //   address: 'unknown',
  //   image_url: '',
  //   rating: 0,
  // };

  return (
    <div className="flex w-[100%] border-solid border-y-[0.5px] h-[80px]">
      <Image
        src={profile.imageUrl}
        alt="프로필사진"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width={60}
        height={60}
        className="w-[60px] h-[60px] rounded-[50%] my-auto ml-[15px]"
      />
      <div className="flex flex-col justify-between m-[10px] whitespace-nowrap text-ellipsis overflow-hidden">
        <div className="text-[20px] font-[600]">{profile.name}</div>
        <div className="text-[16px] text-gray">{profile.address}</div>
      </div>
      <div className=" ml-auto flex-col items-center mr-[15px]">
        <MdInsertEmoticon size={50} />
        <div className="text-center">{profile.rating}</div>
      </div>
    </div>
  );
}

export default Profile;
