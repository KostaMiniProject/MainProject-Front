'use client';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import React, { useEffect, useState } from 'react';
import { MdOutlinePostAdd, MdSearch } from 'react-icons/md';
import CommunityPost from '@/components/community/CommunityPost';
import { getCommunityPost } from '@/apis/CommunityApi';
import Link from 'next/link';

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
    <div className='mx-default'>
      <Header title="커뮤니티">
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
