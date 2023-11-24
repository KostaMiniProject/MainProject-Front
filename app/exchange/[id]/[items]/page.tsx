import { getProfile } from '@/api/ProfileApi';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import React from 'react';

import Image from 'next/image';
import { getItemList } from '@/api/ItemApi';
import Item from '@/components/item/Item';

function page({ params }: { params: any }) {
  const itemList = getItemList();
  return (
    <div>
      <Header title="입찰 아이템 리스트">
        <div>asdf</div>
      </Header>
      <Profile profile={getProfile()} />
      <div className="mx-[15px]">
        {itemList.map((e: any, i: any) => {
          return <Item item={e} key={i} />;
        })}
      </div>
    </div>
  );
}

export default page;
