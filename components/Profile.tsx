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
  return (
    <div className="flex w-[100%] my-[5px]">
      <Image
        src={profile.imageUrl}
        alt="프로필사진"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width={60}
        height={60}
        className="w-[30px] h-[30px] rounded-[50%] my-auto"
      />
      <div className="flex flex-col mx-[5px] items-center whitespace-nowrap text-ellipsis overflow-hidden">
        <div className="text-title font-[600]">{profile.name}</div>
        {/* <div className="text-[16px] text-gray">{profile.address}</div> */}
      </div>
      <div className=" ml-auto flex-col items-center mr-[15px]">
        {/* <MdInsertEmoticon size={50} /> */}
        <div className="text-center">점수 : {profile.rating}</div>
      </div>
    </div>
  );
}

export default Profile;
