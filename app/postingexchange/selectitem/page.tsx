// 페이지
'use client';
import Header from '@/components/Header';
import Item from '@/components/item/Item';
import { getItemList } from '@/api/ItemApi';
import React, { useState } from 'react';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const itemList = getItemList();
  const router = useRouter();

  const handleItemClick = (itemId: number) => {
    // 이미 선택된 아이템이면 선택 해제, 아니면 선택
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === itemId ? null : itemId
    );
  };

  const handleSendData = () => {
    // 선택된 아이템을 JSON 데이터로 전송
    const selectedItemsData = itemList.filter(
      (item: any) => item.id === selectedItem
    );
    // JSON 데이터를 query string으로 변환
    const queryString = `selectedItems=${selectedItem}`;
    // postingexchange 페이지로 이동
    router.push(`/postingexchange?${queryString}`);
  };

  return (
    <div>
      <Header backNav title="교환 물건 선택"></Header>
      <div className="text-[18px] font-[600] text-center border-solid border-b-gray border-y-[0.5px] py-[5px] bg-softbase">
        교환 할 물건을 선택하세요
      </div>
      <div className="m-[15px]">
        {itemList.map((item: any) => (
          <div
            key={item.id}
            style={
              selectedItem === item.id
                ? {
                    backgroundColor: '#ffe8f9',
                  }
                : {}
            }
            className={`item-wrapper ${
              selectedItem === item.id ? 'selected' : ''
            }`}
            onClick={() => handleItemClick(item.id)}
          >
            <Item item={item} />
          </div>
        ))}
      </div>
      <BottomFixed>
        <div className="flex my-[5px]">
          <Button
            rounded="rounded"
            text="+ 물건 추가"
            onClick={() => {}}
            height={8}
            fontSize={16}
          />
        </div>
        <div className={` flex-1 text-center  `}>
          <Button
            rounded="soft"
            text="선택 완료"
            onClick={handleSendData}
            height={8}
            fontSize={18}
          />
        </div>
      </BottomFixed>
      <div className="h-[110px]" />
    </div>
  );
}

export default Page;
