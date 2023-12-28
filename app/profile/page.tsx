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
import Modal from '@/components/Modal';
import { deleteUser } from '@/apis/DeleteUserApi';

interface profileType {
  address: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  userStatus: string;
  rating: number;
}

function page() {
  const router = useRouter();
  const [profile, setProfile] = useState<profileType>();
  const [showModal, setShowModal] = useState(false);
  const profileMenu =
    'p-[10px] border-b-[0.5px] border-gray text-title flex justify-between';
  const iconSize = 20;
  function handleLogout() {
    // 쿠키에서 토큰 및 사용자 ID 삭제  `1    1/.
    removeCookie('token');
    removeCookie('userId');
    router.push('/login');
  }
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePostComplete = async () => {
    setShowModal(false);
    wthdrawal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const wthdrawal = async () => {
    try {
      const data = await deleteUser();
      handleLogout();
      alert('탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.');
    } catch (error) {
      console.log(error);
      alert('탈퇴중 에러 발생');
    }
  };

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
        <div className="mr-[16px]">
          <Button
            text="로그아웃"
            fontSize={16}
            height={5}
            rounded="soft"
            onClick={() => {
              handleLogout();
            }}
          />
        </div>
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
          <div className="ml-default ">
            <div className="flex">
              <div className=" text-header font-[600] flex-1">
                {/* {myProfile.name} */}
                {profile?.name}
              </div>
              <div className="text-gray text-title">
                점수 : {profile?.rating.toFixed(1)}
              </div>
            </div>
            <div className=" text-title font-[600]">
              {/* {myProfile.name} */}
              {profile?.address}
            </div>
            <div className="flex">
              <div className="flex items-center justify-between flex-1">
                <Link href={'/profile/editprofile'}>
                  <div className="flex">
                    내 정보 <MdChevronRight size={iconSize} />
                  </div>
                </Link>
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
          <Link href={'/profile/dib'}>
            <div className={profileMenu}>
              <div>찜목록</div>
              <MdChevronRight size={iconSize} />
            </div>
          </Link>
          <Link href={'/profile/block'}>
            <div className={profileMenu}>
              <div>차단 리스트</div>
              <MdChevronRight size={iconSize} />
            </div>
          </Link>
          <footer className="absolute bottom-12 left-[40%] text-gray">
            <div className={profileMenu} onClick={handleShowModal}>
              <div>탈퇴 하기</div>
            </div>
          </footer>
          {showModal && (
            <Modal setState={handleCloseModal}>
              <div className="my-[5px]">회원 탈퇴를 정말 하시겠습니까?</div>
              <div className="flex place-content-between">
                <Button
                  text="탈퇴하기"
                  onClick={handlePostComplete}
                  height={5}
                  rounded="soft"
                />
                <Button
                  text="취소"
                  onClick={handleCloseModal}
                  height={5}
                  rounded="soft"
                />
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(page, ['user']);
