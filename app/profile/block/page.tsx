'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import Button from '@/components/Button';
import { getBlockedUsers, putBlockUser } from '@/apis/BlockedApi';
import Link from 'next/link';

interface blockType {
  blockingUserId: number;
  name: string;
  profileImage: string;
  updatedAt: string;
  createdAt: string;
  userId: number;
}

function Page() {
  const [blockData, setBlockData] = useState<blockType[]>([]);

  async function getBlocked() {
    try {
      const data: any = await getBlockedUsers();
      console.log('Received data from getBlockedUsers:', data);
      setBlockData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBlocked();
    console.log('blockData has been updated:', blockData);
  }, []);

  function BlockedUser({ user }: { user: blockType }) {
    console.log('Rendering BlockedUser component with user:', user);
    const date = new Date(user.createdAt);
    const formattedDate = date.toLocaleDateString('ko-KR');
    const blockUser = async () => {
      try {
        await putBlockUser(user.blockingUserId.toString());
      } catch (error) {}
    };
    return (
      <div className="flex py-[5px] border-b-[0.5px] border-gray mb-[3px] mx-[15px]">
        <div className="flex items-center mb-[3px]">
          {/* 1. 이미지 */}
          <div className="relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px] rounded-[8px]">
            <Image
              src={user.profileImage}
              alt="Item image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          {/* 2. 닉네임, 차단 날짜 */}
          <div className="relative flex-1 px-[5px] flex-col flex justify-between whitespace-nowrap text-ellipsis overflow-hidden">
            <div>
              <div className="font-[800] text-title leading-none text-ellipsis overflow-hidden">
                {user.name}
              </div>
              <div className="text-gray text-subtitle leading-none">
                {formattedDate}
              </div>
            </div>
          </div>
          {/* 3. 차단 해제 버튼 */}
          <div
            onClick={async () => {
              await blockUser();
              await getBlocked();
            }}
            className="flex relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px] rounded-[8px] items-center"
          >
            <Button text="차단 해제" fontSize={12} height={8} rounded="soft" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mx-default">
        <Header title="차단 목록"></Header>
      </div>
      {/* 차단 리스트 */}
      {blockData ? (
        blockData.map((user: blockType, i: number) => {
          return <BlockedUser key={i} user={user} />;
        })
      ) : (
        <div>차단 리스트가 없습니다.</div>
      )}
    </div>
  );
}

export default Page;
