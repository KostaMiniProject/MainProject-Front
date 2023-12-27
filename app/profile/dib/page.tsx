'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getDibList, getPostList } from '@/apis/ExchangePostApi';
import { MdOutlineListAlt, MdOutlineSearch } from 'react-icons/md';
import Link from 'next/link';
import Header from '@/components/Header';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Page() {
  const [postData, setPostData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await getDibList();
        setPostData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    fetchPostData();
  }, []);

  return (
    <div className="relative">
      <div className="mx-default">
        <Header title="찜 목록">
          <Link href={'/search'}>
            <MdOutlineSearch size={40} />
          </Link>
        </Header>
        <div>
          <div className="text-header font-[600] border-b-[0.5px] border-gray py-[10px]">
            현재 찜한 물건
          </div>
          <div>
            {postData ? (
              postData?.map((e: any, i: any) => {
                return (
                  <Link href={`/exchange/${e.exchangePostId}`} key={i}>
                    <div className=" flex py-[5px] border-b-[0.5px] border-gray">
                      <div className="relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px] rounded-[8px]">
                        <Image
                          src={e.representativeImageUrl}
                          alt="Item image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                        {/* <div className="absolute right-0">
                      <FaHeart />
                      <FaRegHeart />
                    </div> */}
                      </div>
                      {/* 우측 데이터부분 */}
                      <div className="relative flex-1 px-[5px] flex-col flex justify-between whitespace-nowrap text-ellipsis overflow-hidden">
                        <div>
                          {/* 타이틀 */}
                          <div className="font-[800] text-title leading-none text-ellipsis overflow-hidden">
                            {e.title}
                          </div>
                          {/* 주소 */}
                          {/* <div className="text-gray text-subtitle leading-none">
                        주소 입력값
                      </div> */}
                        </div>

                        {/* 게시날짜와 입찰 수 */}
                        <div className="flex justify-between absolute bottom-0   right-0">
                          <div className="flex">
                            <div className="text-gray mr-[10px] text-subtitle">
                              {e.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>찜한 물건이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
