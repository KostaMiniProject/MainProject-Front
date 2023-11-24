'use client';
import React from 'react';
import Scarch from '@/components/Search';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getCategory, getExchangePostList } from '@/api/ExchangePostApi';
import HashTag from '@/components/HashTag';
import { useRouter } from 'next/navigation';

function Page() {
  const exchangePostData = getExchangePostList();
  const category = getCategory();
  const router = useRouter();
  return (
    <div className="relative">
      <Scarch />
      {/* 컨텐츠 */}
      <div className="mx-[15px] min-h-[80vh]">
        {/* 카테고리 */}
        <div className="bg-white flex flex-wrap">
          {category.map((e: any, i: any) => {
            return <HashTag key={i} text={e} height={5} btnStyle="tag" />;
          })}
        </div>
        {/* ExchangePost 리스트 */}
        <div>
          {exchangePostData.map((e: any, i: any) => {
            return e.status !== 'deleted' ? (
              <div
                className="cursor-pointer"
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
      <div className="fixed bottom-[100px]">
        <HashTag text="+ 글 쓰기" height={10} />
      </div>
    </div>
  );
}

export default Page;
