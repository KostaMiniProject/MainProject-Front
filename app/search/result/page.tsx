'use client';
import React, { useState, useEffect, useRef } from 'react';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getPostList, getSearchPostList } from '@/apis/ExchangePostApi';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { MdOutlineSearch } from 'react-icons/md';
import Link from 'next/link';
import Header from '@/components/Header';
import InfiniteScrollObserver from '@/components/InfiniteScrollObserver';
import { useSearchParams } from 'next/navigation';

function Page() {
  const [postData, setPostData] = useState<any[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pageNation, setPageNation] = useState(0);
  const searchParams = useSearchParams();

  const fetchPostData = async () => {
    if (!hasMoreData) return;
    const keyword = searchParams.get('keyword');

    try {
      const data = await getSearchPostList(
        pageNation,
        encodeURI(keyword ?? '')
      );
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
        <Header backNav title="물물교환">
          <Link href={'/search'}>
            <MdOutlineSearch size={40} />
          </Link>
        </Header>

        {/* 컨텐츠 */}

        <div>
          <div className="text-header font-[600] border-b-[0.5px] border-gray py-[10px]">
            {searchParams.get('keyword')} 로 검색한 결과
          </div>
          {/* ExchangePost 리스트 */}
          <div>
            {postData.map((e: any, i: any) => {
              return (
                <Link href={`/exchange/${e.exchangePostId}`} key={i}>
                  {/* 포스트 아이템 생성 */}
                  <ExchangePost key={i} bid={e} />
                </Link>
              );
            })}
            <InfiniteScrollObserver
              onIntersect={fetchPostData}
              hasMoreData={hasMoreData}
            />
          </div>
          {/* 글쓰기 버튼 */}
        </div>
      </div>
      <BottomFixed>
        <div className="flex justify-end">
          <Link href={'/postingexchange/selectitem'}>
            <Button text="+ 글 쓰기" height={10} fontSize={16} />
          </Link>
        </div>
      </BottomFixed>
    </div>
  );
}

export default Page;
