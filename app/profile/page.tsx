import { getProfileById } from '@/api/ProfileApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import ProfileContainer from '@/components/profile/ProfileContainer';
import React from 'react';
import { MdTagFaces, MdThumbDown, MdThumbUp } from 'react-icons/md';

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

async function Page() {
  // const myProfile = await getProfileById(1);
  return (
    <div>
      <Header title="내 정보" />
      <div className="">
        <div className="flex items-center mx-[15px] py-[10px]">
          <div className="h-[120px] w-[120px] bg-black rounded-[50%] overflow-hidden">
            {/* 프로필 사진 */}
            <div className="text-white">프로필</div>
            <div className="text-white">프로필</div>
          </div>
          <div className="flex-1">
            <div className="mx-[15px] text-[24px] font-[600]">
              {/* {myProfile.name} */}
            </div>
            <div className="flex">
              <div className="ml-auto">
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
        <div className="flex items-center text-center mx-[15px]">
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
        </div>

        <ProfileContainer text="내 물건">
          <div>ㅁㄴㅇㄹ</div>
        </ProfileContainer>
        <ProfileContainer text="거래 내역">
          <div>ㅁㄴㅇㄹ</div>
        </ProfileContainer>
        <ProfileContainer text="찜 목록">
          <div>ㅁㄴㅇㄹ</div>
        </ProfileContainer>
      </div>
    </div>
  );
}

export default Page;
