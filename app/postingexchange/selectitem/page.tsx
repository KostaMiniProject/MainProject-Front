// 페이지
'use client';
import Header from '@/components/Header';
import Item from '@/components/item/Item';
import { getItemList } from '@/apis/ItemApi';
import React, { useEffect, useState } from 'react';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { withAuthorization } from '@/HOC/withAuthorization';
import Link from 'next/link';

interface ItemType {
  itemId: number;
  title: string;
  description: string;
  images: string;
  itemStatus: string;
}

function page() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옴
    const fetchData = async () => {
      try {
        const items = await getItemList();
        setItemList(items.data);
      } catch (error) {
        console.error('아이템 목록을 불러오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옴
    console.log(itemList);
  }, [itemList]);

  function handleItemClick(itemId: number) {
    // 이미 선택된 아이템이면 선택 해제, 아니면 선택
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === itemId ? null : itemId
    );
  }

  function handleSendData() {
    if (selectedItem) {
      const queryString = `selectedItems=${selectedItem}`;
      // postingexchange 페이지로 이동
      router.push(`/postingexchange?${queryString}`);
    } else {
      alert('물건을 선택 해 주세요');
    }
  }

  return (
    <div>
      <div className="mx-default">
        <Header backNav title="교환 물건 선택"></Header>
        <div className="text-header font-[600] text-center border-solid border-b-gray border-y-[0.5px] py-[5px] ">
          교환 할 물건을 선택하세요
        </div>
        {itemList.length > 0 ? (
          itemList.map((item: any) => (
            <div
              key={item.id}
              style={
                selectedItem === item.itemId
                  ? {
                      backgroundColor: '#ffe8f9',
                    }
                  : {}
              }
              className={`item-wrapper ${
                selectedItem === item.itemId ? 'selected' : ''
              }`}
              onClick={() => handleItemClick(item.itemId)}
            >
              <Item item={item} />
            </div>
          ))
        ) : (
          <div>물건이 없습니다</div>
        )}
      </div>
      <div className="h-[110px]" />
      <BottomFixed>
        <div className="flex my-[5px]">
          <Link href={`/additem?action=posting`}>
            <Button
              rounded="rounded"
              text="+ 물건 추가"
              height={8}
              fontSize={16}
            />
          </Link>
        </div>
        <div className={` flex-1 text-center cursor-pointer `}>
          <Button
            rounded="soft"
            text="선택 완료"
            onClick={handleSendData}
            height={8}
            fontSize={18}
          />
        </div>
      </BottomFixed>
    </div>
  );
}

export default withAuthorization(page, ['user']);
