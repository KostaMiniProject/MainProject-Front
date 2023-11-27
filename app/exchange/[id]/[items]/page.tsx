'use client';
import { getProfile } from '@/api/ProfileApi';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import React from 'react';

import { getItemList } from '@/api/ItemApi';
import Item from '@/components/item/Item';
import HashTag from '@/components/HashTag';
import BottomFixed from '@/components/BottomFixed';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';

function page({ params }: { params: any }) {
  const itemList = getItemList();

  return (
    <div className="relative">
      <Header title="입찰 아이템 리스트">
        <div className="w-[60px] flex justify-center">
          <MdOutlineReportGmailerrorred size={40} />
        </div>
      </Header>
      <Profile profile={getProfile(1)} />
      <div className="mx-[15px]">
        {itemList.map((e: any, i: any) => {
          return <Item item={e} key={i} />;
        })}
      </div>
      <BottomFixed>
        <div className="flex justify-between">
          <HashTag text="거절하기" height={10} fontSize={20} />
          <HashTag text="대화하기" height={10} fontSize={20} />
        </div>
      </BottomFixed>
    </div>
  );
}

export default page;
