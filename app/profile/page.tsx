'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { removeCookie } from '@/apis/Cookie';
import { useRouter } from 'next/navigation';
import { withAuthorization } from '@/HOC/withAuthorization';
import { getMyProfile } from '@/apis/ProfileApi';
import Image from 'next/image';
import Link from 'next/link';

function handleLogout() {
  // 쿠키에서 토큰 및 사용자 ID 삭제  `1    1/.
  removeCookie('token');
  removeCookie('userId');
}
interface profileType {
  address: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  userStatus: string;
}

function page() {
  const router = useRouter();
  const [profile, setProfile] = useState<profileType>();
  const profileMenu =
    'p-[10px] border-b-[0.5px] border-gray text-title flex justify-between';
  const iconSize = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

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
        <div className="flex items-center mx-[15px] py-[10px] border-b-[0.5px] border-gray">
          <div className="h-[120px] w-[120px] bg-black rounded-[50%] overflow-hidden">
            {/* 프로필 사진 */}
            {profile && (
              <Image
                src={profile.profileImage}
                alt="프로필사진"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                width={60}
                height={60}
                className="w-full h-full "
              />
            )}
          </div>
          <div className="ml-default flex-1">
            <div className=" text-header font-[600]">
              {/* {myProfile.name} */}
              {profile?.name}
            </div>
            <div className=" text-title font-[600]">
              {/* {myProfile.name} */}
              {profile?.address}
            </div>
            <div className="flex">
              <div className="flex items-center justify-between flex-1">
                <div className="flex">
                  내 정보 <MdChevronRight size={iconSize} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-default flex-1">
          <Link href={'/myexchangepostlist'}>
            <div className={profileMenu}>
              <div>내 교환 게시글</div>
              <MdChevronRight size={iconSize} />
            </div>
          </Link>
          <Link href={'/myitem'}>
            <div className={profileMenu}>
              <div>내 아이템</div>
              <MdChevronRight size={iconSize} />
            </div>
          </Link>
          <Link href={'/profile/exchangeHistory'}>
            <div className={profileMenu}>
              <div>거래내역</div>
              <MdChevronRight size={iconSize} />
            </div>
          </Link>
          <Link href={'/mycommunitypostlist'}>
            <div className={profileMenu}>
              <div>내 커뮤니티 게시글</div>
              <MdChevronRight size={iconSize} />
            </div>
          </Link>
          <div className={profileMenu}>
            <div>찜목록</div>
            <MdChevronRight size={iconSize} />
          </div>
          <Link href={'/profile/block'}>
            <div className={profileMenu}>
              <div>차단 리스트</div>
              <MdChevronRight size={iconSize} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(page, ['user']);
