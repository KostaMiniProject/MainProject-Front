'use client';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';

import Item from '@/components/item/Item';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { getItemList } from '@/apis/ItemApi';
import InputBox from '@/components/InputBox';
import { MdOutlineSearch } from 'react-icons/md';
import Link from 'next/link';

function page() {
  const [itemList, setItemList] = useState([]);
  const route = useRouter();
  const [keyword, setKeyWord] = useState<String>('');

  useEffect(() => {
    // 비동기로 아이템 목록을 불러오고 상태에 설정
    const fetchData = async () => {
      try {
        const data = await getItemList();
        setItemList(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative">
      <Header title="내 물건" backNav></Header>
      {/* 검색창 */}
      <div className=" h-[60px] flex items-center border-b-[1px] border-gray">
        <InputBox onChange={setKeyWord} />
        <div
          onClick={() => {
            console.log(keyword);
          }}
        >
          <MdOutlineSearch size={40} />
        </div>
      </div>
      {/* 물건 리스트 */}
      <div className="mx-[15px]">
        {itemList.length > 0 ? (
          itemList.map((e: any, i: any) => {
            return (
              <Link href={`/itemdetail/${e.itemId}`} key={i}>
                <Item item={e} key={i} />
              </Link>
            );
          })
        ) : (
          <div>등록 된 물건이 없습니다</div>
        )}
      </div>
      {/* 하단 고정 버튼 */}
      <BottomFixed>
        <div className="flex justify-end">
          <Link href={'/additem'}>
            <Button text="+ 물건 등록" height={10} fontSize={16} />
          </Link>
        </div>
      </BottomFixed>
    </div>
  );
}

export default page;
