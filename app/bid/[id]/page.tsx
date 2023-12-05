'use client';
import { getProfile } from '@/api/ProfileApi';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import React from 'react';
import Item from '@/components/item/Item';
import BottomFixed from '@/components/BottomFixed';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { getBidById } from '@/api/BidApi';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

function page({ params }: { params: any }) {
  const itemList = getBidById(params.id);
  const route = useRouter();

  return (
    <div className="relative">
      <Header title="입찰 아이템 리스트" backNav>
        <div className="w-[60px] flex justify-center">
          <MdOutlineReportGmailerrorred size={40} />
        </div>
      </Header>
      {/* 프로필 */}
      <Profile profile={getProfile(1)} />
      {/* 물건 리스트 */}
      <div className="mx-[15px]">
        {itemList.item_list.map((e: any, i: any) => {
          return (
            <div
              key={i}
              onClick={() => {
                route.push(`/itemdetail/${e.id}`);
              }}
            >
              <Item item={e} key={i} />
            </div>
          );
        })}
      </div>
      {/* 하단 고정 버튼 */}
      <BottomFixed>
        {itemList.owner ? (
          <div className="flex justify-between">
            <Button text="입찰취소" height={10} fontSize={20} />
            <Button text="수정하기" height={10} fontSize={20} />
          </div>
        ) : (
          <div className="flex justify-between">
            <Button text="거절하기" height={10} fontSize={20} />
            <Button text="대화하기" height={10} fontSize={20} />
          </div>
        )}
      </BottomFixed>
    </div>
  );
}

export default page;
