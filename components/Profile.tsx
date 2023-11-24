import React from 'react';
import Image from 'next/image';
import { MdInsertEmoticon } from 'react-icons/md';
import TempImg from '@/image/Logo.png';
import { getData } from '@/api/ProfileApi';

interface profileType {
  id: number;
  name: string;
  address: string;
  rating: number;
}

async function Profile({ profile }: { profile: profileType }) {
  // const data = await getData();

  return (
    <div className="flex w-[100%] border-solid border-y-[0.5px] h-[80px]">
      <Image
        src={TempImg}
        alt="프로필사진"
        className="w-[60px] h-[60px] rounded-[50%] my-auto ml-[15px]"
      />
      <div className="flex flex-col justify-between m-[10px]">
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
