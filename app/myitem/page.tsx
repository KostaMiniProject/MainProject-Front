'use client';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';

import Item from '@/components/item/Item';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { getItemList } from '@/api/ItemApi';
import InputBox from '@/components/InputBox';
import { MdOutlineSearch } from 'react-icons/md';

function page() {
  const [itemList, setItemList] = useState([]);
  const route = useRouter();
  const [keyword, setKeyWord] = useState<String>('');

  useEffect(() => {
    // 비동기로 아이템 목록을 불러오고 상태에 설정
    getItemList().then((data) => {
      setItemList(data);
    });
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
        {itemList.map((e: any, i: any) => {
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
        <div className="flex justify-end">
          <Button text="+ 글쓰기" height={10} fontSize={16} />
        </div>
      </BottomFixed>
    </div>
  );
}

export default page;
