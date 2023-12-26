'use client';
import { putBlockUser } from '@/apis/BlockedApi';
import { getProfileById } from '@/apis/ProfileApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdChevronRight, MdFaceRetouchingOff } from 'react-icons/md';
//api/users/profile?name=&{name}

function Page({ params }: { params: any }) {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState<any>();
  const iconSize = 20;
  const router = useRouter();
  // const myProfile = await getProfileById(1);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfileById(params.id);
        setProfile(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, []);

  //모달 핸들
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePostComplete = async () => {
    setShowModal(false);
    handleBlockUser();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBlockUser = async () => {
    try {
      await putBlockUser(params.id);
      alert('차단되었습니다');
      router.push('/profile/block');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header backNav title="프로필 정보">
        <div onClick={handleShowModal} className="cursor-pointer mr-default">
          <MdFaceRetouchingOff size={30} />
        </div>
      </Header>
      {showModal && (
        <Modal setState={handleCloseModal}>
          <div className="text-subtitle w-[250px]">
            <div className="my-[5px] text-header font-[600]">
              해당 사용자를 차단 하시겠습니까?
            </div>
            <div className="flex place-content-between ">
              <Button
                text="차단"
                fontSize={16}
                onClick={handlePostComplete}
                height={6}
                rounded="soft"
              />
              <Button
                text="취소"
                fontSize={16}
                onClick={handleCloseModal}
                height={6}
                rounded="soft"
              />
            </div>
          </div>
        </Modal>
      )}
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
                <div className="flex">점수 : {profile?.rating} 점</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
