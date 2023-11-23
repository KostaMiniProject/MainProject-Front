'use client';
import React from 'react';
import Scarch from '@/components/Search';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getCategory, getExchangePostList } from '@/api/ExchangePostApi';
import HashTag from '@/components/HashTag';

function Page() {
  const exchangePostData = getExchangePostList();
  const category = getCategory();
  return (
    <div className="relative">
      <Scarch />
      {/* 컨텐츠 */}
      <div className="mx-[15px] min-h-[80vh]">
        {/* 카테고리 */}
        <div className="bg-white flex flex-wrap">
          {category.map((e: any) => {
            return <HashTag text={e} height={5} />;
          })}
        </div>
        {/* ExchangePost 리스트 */}
        <div>
          {exchangePostData.map((e: any) => {
            return e.status !== 'deleted' ? <ExchangePost bid={e} /> : <></>;
          })}
        </div>
      </div>
      <div className="fixed bottom-[100px]">
        <HashTag text="+ 글 쓰기" height={10} />
      </div>
    </div>
  );
}

export default Page;
