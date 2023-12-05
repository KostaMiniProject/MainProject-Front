'use client';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import React from 'react';
import { MdSearch } from 'react-icons/md';
import CommunityPost from '@/components/community/CommunityPost';

function Page() {
  return (
    <div>
      <Header title="커뮤니티"></Header>
      <div className="border-gray border-solid border-y-[0.5px]">
        <div className="flex mx-[15px] my-[5px] ">
          <InputBox onChange={() => {}}></InputBox>
          <div className="items-center justify-center flex">
            <MdSearch size={40} />
          </div>
        </div>
      </div>
      <div className="mx-[15px]">
        <CommunityPost></CommunityPost>
      </div>
    </div>
  );
}

export default Page;
