'use client';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import React, { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import CommunityPost from '@/components/community/CommunityPost';
import { getCommunityPost } from '@/apis/CommunityApi';

function Page() {
  const [postData, setPostData] = useState<[]>([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const data: any = await getCommunityPost(0);
        setPostData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, []);

  useEffect(() => {
    console.log(postData);
  }, [postData]);
  return (
    <div>
      <Header title="커뮤니티"></Header>
      <div className="border-gray border-solid border-y-[0.5px]">
        <div className="flex my-[5px] ">
          <InputBox onChange={() => {}}></InputBox>
          <div className="items-center justify-center flex">
            <MdSearch size={40} />
          </div>
        </div>
      </div>
      <div className="">
        {postData &&
          postData.map((e: any, i: any) => {
            return <CommunityPost post={e} key={i}></CommunityPost>;
          })}
      </div>
    </div>
  );
}

export default Page;
