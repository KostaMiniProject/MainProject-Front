'use client';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import React, { useEffect, useState } from 'react';
import Item from '@/components/item/Item';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { getBidItemList } from '@/api/BidApi';
import Link from 'next/link';
interface ItemList {
  isOwner: boolean;
  profile: {
    id: number;
    name: string;
    address: string;
    imageUrl: string;
    rating: number;
  };
  items: {
    id: number;
    title: string;
    description: string;
    imageUrls: string;
    createdAt: string;
  }[];
}

function page({ params }: { params: any }) {
  const [itemList, setItemList] = useState<ItemList>();
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedItemList = await getBidItemList(params.id);
        setItemList(fetchedItemList);
      } catch (error) {
        console.error('Error fetching item list:', error);
      }
    }
    fetchData();
  }, [params.id]);

  return (
    <div className="relative">
      <Header title="입찰 아이템 리스트" backNav>
        <div className="w-[60px] flex justify-center">
          <MdOutlineReportGmailerrorred size={40} />
        </div>
      </Header>
      {/* 프로필 */}
      {itemList && <Profile profile={itemList.profile} />}
      {/* 물건 리스트 */}
      <div className="">
        {itemList &&
          itemList.items.map((e: any, i: any) => {
            return (
              <Link href={`/itemdetail/${e.itemId}`} key={i}>
                <Item item={e} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default page;
