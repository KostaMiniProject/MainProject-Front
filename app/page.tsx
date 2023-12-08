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

  async function tests() {
    testLogin('1', '1');
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          tests();
        }}
      >
        테스트버튼
      </button>
      <div>
        <div className="h-[60px] flex items-center border-b-[1px] border-gray">
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
        </div>

        {/* 컨텐츠 */}

        <div>
          <div className="">
            <div className="text-[16px] font-[600] border-b-[0.5px] border-gray p-[10px]">
              현재 진행중인 교환
            </div>
            {/* ExchangePost 리스트 */}
            <div>
              {postData.map((e: any, i: any) => {
                return e.status !== 'deleted' ? (
                  <div
                    key={i}
                    className="cursor-pointer border-b-[0.5px] box-border border-gray"
                    onClick={() => {
                      // 연결 페이지
                      router.push(`/exchange/${e.exchangePostId}`);
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
                  router.push('/postingexchange/selectitem');
                }}
              />
            </div>
          </BottomFixed>
        </div>
      </div>
    </div>
  );
}

export default Page;
