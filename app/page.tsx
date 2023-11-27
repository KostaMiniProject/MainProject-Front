'use client';
import React from 'react';
import Scarch from '@/components/Search';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getCategory, getExchangePostList } from '@/api/ExchangePostApi';
import { useRouter } from 'next/navigation';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';

function Page() {
  const exchangePostData = getExchangePostList();
  const category = getCategory();
  const router = useRouter();
  return (
    <div className="relative">
      <Scarch />
      {/* 컨텐츠 */}
      <div className="mx-[15px]">
        {/* 카테고리 */}
        <div className="bg-white flex flex-wrap">
          {category.map((e: any, i: any) => {
            return <Button key={i} text={e} height={5} btnStyle="tag" />;
          })}
        </div>
        {/* ExchangePost 리스트 */}
        <div>
          {exchangePostData.map((e: any, i: any) => {
            return e.status !== 'deleted' ? (
              <div
                key={i}
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
      <BottomFixed>
        <div className="flex justify-end">
          <Button text="+ 글 쓰기" height={10} fontSize={16} />
        </div>
      </BottomFixed>
    </div>
  );
}

export default Page;
