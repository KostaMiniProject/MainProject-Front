'use client';
import React, { useState, useEffect, useRef } from 'react';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getMyPostList } from '@/apis/ExchangePostApi';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { MdOutlineSearch } from 'react-icons/md';
import Link from 'next/link';
import Header from '@/components/Header';
import InfiniteScrollObserver from '@/components/InfiniteScrollObserver';

function Page() {
  const [postData, setPostData] = useState<any[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pageNation, setPageNation] = useState(0);

  const fetchPostData = async () => {
    if (!hasMoreData) return;

    try {
      const data = await getMyPostList(pageNation);
      setPostData((oldData) => [...oldData, ...data.data]);
      setPageNation((prev) => prev + 1);
      console.log(pageNation);

      if (data.data.length < 10) {
        setHasMoreData(false);
      } else {
      }
    } catch (error) {
      console.error('Error fetching post data:', error);
      setHasMoreData(false);
    }
  };

  return (
    <div className="relative">
      <div className="mx-default">
        <Header title="내가 작성한 교환 게시글">
          <Link href={'/search'}>
            <MdOutlineSearch size={40} />
          </Link>
        </Header>

        {/* 컨텐츠 */}

        <div>
          <div className="text-header font-[600] border-b-[0.5px] border-gray py-[10px]">
            {/* 현재 진행중인 교환 */}
          </div>
          {/* ExchangePost 리스트 */}
          <div>
            {postData ? (
              postData.map((e: any, i: any) => {
                return (
                  <Link href={`/exchange/${e.exchangePostId}`} key={i}>
                    {/* 포스트 아이템 생성 */}
                    <ExchangePost key={i} bid={e} />
                  </Link>
                );
              })
            ) : (
              <div>작성한 교환 게시글이 없습니다.</div>
            )}
            <InfiniteScrollObserver
              onIntersect={fetchPostData}
              hasMoreData={hasMoreData}
            />
          </div>
          {/* 글쓰기 버튼 */}
        </div>
      </div>
      <BottomFixed>
        <div className="flex justify-end m-[10px]">
          <Link href={'/postingexchange/selectitem'}>
            <Button text="+ 글 쓰기" height={10} fontSize={16} />
          </Link>
        </div>
      </BottomFixed>
    </div>
  );
}

export default Page;
