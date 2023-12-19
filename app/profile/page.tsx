'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import ProfileContainer from '@/components/profile/ProfileContainer';
import React, { useState, useEffect } from 'react';
import { MdTagFaces, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { getCookie, removeCookie } from '@/api/Cookie';
import { useRouter } from 'next/navigation';
import { withAuthorization } from '@/HOC/withAuthorization';
import { getMyDibs, getMyHistory, getMyItemList } from '@/api/ProfileApi';

// ReviewContainer 컴포넌트
function ReviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 border-solid border-[2px] border-base rounded-[10px] m-[10px] bg-white">
      <div className="flex flex-col items-center justify-center h-full p-[20px]">
        {children}
      </div>
    </div>
  );
}

function handleLogout() {
  // 쿠키에서 토큰 및 사용자 ID 삭제  `1    1/.
  removeCookie('token');
  removeCookie('userId');
}

function page() {
  const [items, setItems] = useState<[]>([]);
  const [dibs, setDibs] = useState<[]>([]);
  const [history, setHistory] = useState<[]>([]);
  const router = useRouter();

  useEffect(() => {
    const myId = getCookie('userId');

    async function fetchItem(page: number) {
      try {
        const data: any = await getMyItemList(page);
        setItems(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchDibs(userId: number) {
      try {
        const data: any = await getMyDibs(userId);
        setDibs(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchHistory(page: number) {
      try {
        const data: any = await getMyHistory(page);
        setHistory(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchHistory(0);
    fetchItem(0);
    if (myId) {
      fetchDibs(parseInt(myId));
    }
  }, []);

  return (
    <div>
      <Header title="내 정보">
        <Button
          text="로그아웃"
          fontSize={16}
          height={5}
          rounded="soft"
          onClick={() => {
            router.push('/login');

            handleLogout();
          }}
        />
      </Header>
      <div className="">
        <div className="flex items-center mx-[15px] py-[10px]">
          <div className="h-[120px] w-[120px] bg-black rounded-[50%] overflow-hidden">
            {/* 프로필 사진 */}
            <div className="text-white">프로필</div>
            <div className="text-white">프로필</div>
          </div>
          <div className="ml-default flex-1">
            <div className=" text-header font-[600]">
              {/* {myProfile.name} */}
              닉네임
            </div>
            <div className=" text-title font-[600]">
              {/* {myProfile.name} */}
              주소
            </div>
            <div className="flex">
              <div className="flex items-center justify-between flex-1">
                <div className="text-subtitle">점수</div>
                <Button
                  text="내 정보"
                  fontSize={16}
                  height={5}
                  rounded="soft"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center text-center mx-[15px]">
          <ReviewContainer>
            <MdThumbDown size={20} color={'#e00685'} />
            <div className="text-[20px]">0</div>
          </ReviewContainer>
          <ReviewContainer>
            <MdTagFaces size={20} color={'#e00685'} />
            <div className="text-[20px]">0</div>
          </ReviewContainer>
          <ReviewContainer>
            <MdThumbUp size={20} color={'#e00685'} />
            <div className="text-[20px]">0</div>
          </ReviewContainer>
        </div> */}

        <ProfileContainer text="내 물건">
          <div className="flex">
            {items.length > 0 ? (
              items.map((e: any, i: any) => {
                return <Button text={e.title} height={8} key={i}></Button>;
              })
            ) : (
              <>아이템이 없습니다</>
            )}
          </div>
        </ProfileContainer>
        <ProfileContainer text="거래 내역">
          {history.length > 0 ? (
            history.map((e: any) => {
              return <div></div>;
            })
          ) : (
            <>최근 거래내역이 없습니다</>
          )}
        </ProfileContainer>
        <ProfileContainer text="찜 목록">
          {dibs.length > 0 ? (
            dibs.map((e: any) => {
              return <div></div>;
            })
          ) : (
            <>찜한 상품이 없습니다</>
          )}
        </ProfileContainer>
      </div>
    </div>
  );
}

export default withAuthorization(page, ['user']);
