'use client';
import React, { useState, useEffect } from 'react';
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
  const [postData, setPostData] = useState([]);
  const router = useRouter();
  const [keyWord, setKeyWord] = useState('');
  const [pageNation, setPageNation] = useState(0);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await getPostList(pageNation);
        setPostData(data.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, []);

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
