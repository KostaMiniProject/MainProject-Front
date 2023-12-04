'use client';
import React, { useState } from 'react';
import InputBox from '@/components/InputBox';
import ExchangePost from '@/components/exchange/ExchangePost';
import {
  getCategory,
  getExchangePostList,
  getPostList,
} from '@/api/ExchangePostApi';
import { useRouter } from 'next/navigation';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { MdOutlineSearch } from 'react-icons/md';

function Page() {
  const exchangePostData = getExchangePostList();
  const getPostData = getPostList();
  const category = getCategory();
  const router = useRouter();
  const [keyWord, setKeyWord] = useState<String>('');
  console.log(getPostData);
  return (
    <div className="relative">
      <div className=" h-[60px] flex items-center border-b-[1px] border-gray">
        <InputBox onChange={setKeyWord} />
        <div
          onClick={() => {
            console.log(keyWord);
          }}
        >
          <MdOutlineSearch size={40} />
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="">
        <div className="text-[16px] font-[600] border-b-[0.5px] border-gray p-[10px]">
          현재 진행중인 교환
        </div>
        {/* ExchangePost 리스트 */}
        <div>
          {exchangePostData.map((e: any, i: any) => {
            return e.status !== 'deleted' ? (
              <div
                key={i}
                className="cursor-pointer border-b-[0.5px] box-border border-gray"
                onClick={() => {
                  // 연결 페이지
                  router.push(`/exchange/${e.id}`);
                }}
              >
                {/* 포스트 아이템 생성 */}
                <ExchangePost key={i} bid={e} />
              </div>
            ) : (
              <React.Fragment key={i}></React.Fragment>
            );
          })}
        </div>
      </div>
      {/* 글쓰기 버튼 */}
      <BottomFixed>
        <div className="flex justify-end">
          <Button
            text="+ 글 쓰기"
            height={10}
            fontSize={16}
            onClick={() => {
              router.push('/postingexchange');
            }}
          />
        </div>
      </BottomFixed>
    </div>
  );
}

export default Page;
