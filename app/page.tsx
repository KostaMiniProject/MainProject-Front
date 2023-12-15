'use client';
import React, { useState, useEffect, useRef } from 'react';
import InputBox from '@/components/InputBox';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getPostList } from '@/api/ExchangePostApi';
import { useRouter } from 'next/navigation';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { MdOutlineSearch } from 'react-icons/md';
import { testLogin } from '@/api/Login';
import Link from 'next/link';
import Header from '@/components/Header';

function Page() {
  const [postData, setPostData] = useState<any[]>([]);
  const [pageNation, setPageNation] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const listEnd = useRef<HTMLDivElement>(null);
  let hasFetchData = true;

  const fetchPostData = async () => {
    if (hasMoreData)
      try {
        const data = await getPostList(pageNation);
        setPostData((oldData) => [...data.data, ...oldData]);

        // 데이터가 10개 미만이면 더 이상 데이터를 불러오지 않음
        if (data.data.length < 10) {
          setHasMoreData(false);
          // hasFetchData = false;
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
        // hasFetchData = false; // 오류 발생 시 데이터 로딩 중단
        setHasMoreData(false);
      }
  };
  useEffect(() => {
    console.log('이팩트 실행');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          setPageNation((prev) => prev + 1);
        }
      },
      { rootMargin: '0px', threshold: 1 }
    );

    if (listEnd.current) {
      observer.observe(listEnd.current);
    }

    // 페이지네이션 증가 시 데이터 가져오기

    return () => {
      if (listEnd.current) {
        observer.unobserve(listEnd.current);
      }
    };
  }, [listEnd]);

  useEffect(() => {
    console.log('이러면 한번실행?');
    fetchPostData();
  }, [pageNation]);

  return (
    <div className="relative">
      <div>
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
          <BottomFixed>
            <div className="flex justify-end">
              <Link href={'/postingexchange/selectitem'}>
                <Button text="+ 글 쓰기" height={10} fontSize={16} />
              </Link>
            </div>
          </BottomFixed>
        </div>
      </div>
    </div>
  );
}

export default Page;
