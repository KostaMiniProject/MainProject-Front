'use client';
import { getProfile } from '@/api/ProfileApi';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import React, { useEffect, useState } from 'react';
import Item from '@/components/item/Item';
import BottomFixed from '@/components/BottomFixed';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
import { getBidItemList } from '@/api/BidApi';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
/**
 * 요청 해야함ㄴ
{
  isOwner: "true"
  profile: {
    id: ,
    name: ,
    address: ,
    imageUrl: ,
    rating: ,
  }
  items: {
    id: ,
    title: ,
    description: ,
    imageUrls: ,
    createdAt: ,
  }
}

 */
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
  const route = useRouter();

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
      <div className="mx-[15px]">
        {itemList &&
          itemList.items.map((e: any, i: any) => {
            return (
              <div
                key={i}
                onClick={() => {
                  route.push(`/itemdetail/${e.itemId}`);
                }}
              >
                <Item item={e} key={i} />
              </div>
            );
          })}
      </div>
      {/* 하단 고정 버튼 */}
      <BottomFixed>
        {itemList && itemList.isOwner ? (
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
