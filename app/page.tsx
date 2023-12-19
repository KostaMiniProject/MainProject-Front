'use client';
import React, { useState, useEffect, useRef } from 'react';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getPostList } from '@/apis/ExchangePostApi';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { MdOutlineSearch } from 'react-icons/md';
import Link from 'next/link';
import Header from '@/components/Header';

function Page() {
  const [postData, setPostData] = useState<any[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const listEnd = useRef<HTMLDivElement>(null);
  let pageNum = 0;
  const fetchPostData = async () => {
    if (!hasMoreData) return;

    try {
      const data = await getPostList(pageNum);
      setPostData((oldData) => [...oldData, ...data.data]);
      pageNum++;
      console.log(pageNum);

      if (data.data.length < 10) {
        setHasMoreData(false);
      } else {
      }
    } catch (error) {
      console.error('Error fetching post data:', error);
      setHasMoreData(false);
    }
  };
  useEffect(() => {
    console.log('이팩트 실행');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          fetchPostData();
        }
      },
      { rootMargin: '0px', threshold: 1 }
    );

    if (listEnd.current) {
      observer.observe(listEnd.current);
    }

    return () => {
      if (listEnd.current) {
        observer.unobserve(listEnd.current);
      }
    };
  }, [listEnd, hasMoreData]); // hasMoreData를 의존성 배열에 추가

  return (
    <div className="relative">
      <div className="mx-default">
        {/* <Link
          href={'/search'}
          className="h-[60px] flex cursor-default items-center border-b-[1px] border-gray"
        >
          <InputBox
            onChange={setKeyWord}
            onFocusChange={(bool) => {
              // router.push('/search');
            }}
          />
          <div
            onClick={() => {
              console.log(keyWord);
            }}
          >
            <MdOutlineSearch size={40} />
          </div>
        </Link> */}
        <Header title="물물교환">
          <MdOutlineSearch size={40} />
        </Header>

        {/* 컨텐츠 */}

        <div>
          <div className="text-header font-[600] border-b-[0.5px] border-gray py-[10px]">
            현재 진행중인 교환
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
            <div ref={listEnd}>endcontent</div>
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
