import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface profileType {
  id: number;
  name: string;
  address?: string;
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
      <div className="flex flex-col mx-[5px] my-auto whitespace-nowrap text-ellipsis overflow-hidden">
        <Link href={`/profile/${profile.name}`}>
          <div className="text-title font-[600]">{profile.name}</div>
        </Link>
        {/* <div className="text-[16px] text-gray">{profile.address}</div> */}
      </div>
      <div className=" ml-auto flex-col items-center mr-[15px] my-auto">
        {/* <MdInsertEmoticon size={50} /> */}
        <div className="text-center text-title text-gray">
          점수 : {profile.rating}
        </div>
      </div>
    </div>
  );
}

export default Profile;
