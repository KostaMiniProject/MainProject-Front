'use client';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import React, { useEffect, useState } from 'react';
import { MdOutlinePostAdd, MdSearch } from 'react-icons/md';
import CommunityPost from '@/components/community/CommunityPost';
import { getMyCommunityPost } from '@/apis/CommunityApi';
import Link from 'next/link';

function Page() {
  const [postData, setPostData] = useState<[]>([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const data: any = await getMyCommunityPost(0);
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
      <Header title="내가 작성한 커뮤니티 게시글 목록">
        <Link href={'/community/posting'}>
          <MdOutlinePostAdd size={40} />
        </Link>
      </Header>

      <div>
        <div className="border-gray border-solid border-y-[0.5px]">
          <div className="flex my-[5px] ">
            <InputBox onChange={() => {}}></InputBox>
            <div className="items-center justify-center flex">
              <MdSearch size={40} />
            </div>
          </div>
        </div>
        <div>
          {postData &&
            postData.map((e: any, i: any) => {
              return <CommunityPost post={e} key={i}></CommunityPost>;
            })}
        </div>
      </div>
    </div>
  );
}

export default Page;
