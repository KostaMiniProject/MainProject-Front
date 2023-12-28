'use client';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import React, { useEffect, useState } from 'react';
import { MdOutlinePostAdd, MdSearch } from 'react-icons/md';
import CommunityPost from '@/components/community/CommunityPost';
import { getCommunityPost, getCommunityPostSearch } from '@/apis/CommunityApi';
import Link from 'next/link';

function Page() {
  const [keyword, setKeyword] = useState('');
  const [postData, setPostData] = useState<[]>([]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 엔터 키에 의한 줄바꿈 방지
      fetchKeywordPost(); // 메시지 전송 함수 호출
    }
  };
  const fetchKeywordPost = async () => {
    try {
      const data = await getCommunityPostSearch(keyword);
      setPostData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
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
    <div className="mx-default">
      <Header title="커뮤니티">
        <Link href={'/community/posting'}>
          <MdOutlinePostAdd size={40} />
        </Link>
      </Header>

      <div>
        <div className="border-gray border-solid border-y-[0.5px]">
          <div className="flex my-[5px] ">
            <InputBox
              onChange={setKeyword}
              onKeyDown={handleKeyPress}
            ></InputBox>
            <div className="items-center justify-center flex">
              <div onClick={fetchKeywordPost}>
                <MdSearch size={40} />
              </div>
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
