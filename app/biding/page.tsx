// 페이지
'use client';
import Header from '@/components/Header';
import Item from '@/components/item/Item';
import { getItemList } from '@/api/ItemApi';
import React, { useState } from 'react';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';

function Page() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const itemList = getItemList();

  const handleItemClick = (itemId: number) => {
    // 이미 선택된 아이템이면 제거, 아니면 추가
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleSendData = () => {
    // 선택된 아이템들을 JSON 데이터로 전송
    const selectedItemsData = itemList.filter((item: any) =>
      selectedItems.includes(item.id)
    );
    console.log(JSON.stringify(selectedItemsData));
  };

  return (
    <div>
      <Header backNav title="입찰 하기"></Header>
      {itemList.map((item: any) => (
        <div
          key={item.id}
          style={
            selectedItems.includes(item.id)
              ? {
                  backgroundColor: '#ffe8f9',
                }
              : {}
          }
          className={`item-wrapper ${
            selectedItems.includes(item.id) ? 'selected' : ''
          }`}
          onClick={() => handleItemClick(item.id)}
        >
          <Item item={item} />
        </div>
      ))}
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
            text="입찰하기"
            onClick={handleSendData}
            height={8}
            fontSize={18}
          />
        </div>
      </BottomFixed>
    </div>
  );
}

export default Page;
