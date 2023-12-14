'use client';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import React from 'react';
import { MdSearch } from 'react-icons/md';
import CommunityPost from '@/components/community/CommunityPost';
import CommunityPostUnImage from '@/components/community/CommunityPostUnImage';

function Page() {
  return (
    <div>
      <Header title="커뮤니티"></Header>
      <div className="border-gray border-solid border-y-[0.5px]">
        <div className="flex  my-[5px] ">
          <InputBox onChange={() => {}}></InputBox>
          <div className="items-center justify-center flex">
            <MdSearch size={40} />
          </div>
        </div>
      </div>
      <div className="">
        <CommunityPost postItem={['', '']}></CommunityPost>
        <CommunityPost></CommunityPost>
      </div>
      <div className="">
        <CommunityPostUnImage></CommunityPostUnImage>
      </div>
    </div>
  );
}

export default Page;
