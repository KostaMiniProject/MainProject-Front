'use client';
import React, { useState, useEffect } from 'react';
import InputBox from '@/components/InputBox';
import ExchangePost from '@/components/exchange/ExchangePost';
import { getPostList } from '@/api/ExchangePostApi';
import { useRouter } from 'next/navigation';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { MdOutlineSearch } from 'react-icons/md';
import { Login } from '@/api/Login';

function Page() {
  const [postData, setPostData] = useState([]);
  const router = useRouter();
  const [keyWord, setKeyWord] = useState('');
  const [owner, setOwner] = useState(true);

  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await getPostList();
        setPostData(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, []);

  async function handleLogin(email: string, password: string) {
    try {
      const token: any = await Login(email, password);
      console.log(token);
      // 토큰을 저장하고 필요한 작업 수행
      setAccessToken(token);
      // 다른 작업 수행 (예: 페이지 리디렉션)
    } catch (error: any) {
      // 로그인 실패 시의 처리
      console.error('로그인 실패:', error.message);
    }
  }

  return (
    <div className="relative">
      <div>
        <div
          onClick={() => {
            handleLogin('2', '2');
          }}
        >
          로그인 하기
        </div>
        <div className="h-[60px] flex items-center border-b-[1px] border-gray">
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
                router.push('/postingexchange');
              }}
            />
          </div>
        </BottomFixed>
      </div>
    </div>
  );
}

export default Page;
