// 페이지
'use client';
import Header from '@/components/Header';
import Item from '@/components/item/Item';
import { getItemList } from '@/api/ItemApi';
import React, { useEffect, useState } from 'react';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { postBid } from '@/api/BidApi';
import { withAuthorization } from '@/HOC/withAuthorization';

function Page() {
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [itemList, setItemList] = useState([]); // 아이템 목록을 상태로 관리
  const [postId, setPostId] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    const postid = searchParams.get('postId');
    if (postid) {
      setPostId(parseInt(postid));
    }
    async function fetchData() {
      try {
        const data = await getItemList();
        console.log(data);
        setItemList(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleItemClick = (itemId: number) => {
    // 이미 선택된 아이템이면 제거, 아니면 추가
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleSendData = () => {
    const body = {
      // itemIds: JSON.stringify(selectedItems),
      itemIds: selectedItems,
    };
    if (postId) {
      try {
        postBid(postId, body);
        router.push(`/exchange/${postId}`);
        // console.log(body);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Header backNav title="입찰 하기"></Header>
      <div className="text-[18px] font-[600] text-center border-solid border-b-gray border-y-[0.5px] py-[5px] bg-softbase">
        입찰 할 물건을 선택하세요
      </div>
      <div className="m-[15px]">
        {itemList.map((item: any) => (
          <div
            key={item.itemId}
            style={
              selectedItems.includes(item.itemId)
                ? {
                    backgroundColor: '#ffe8f9',
                  }
                : {}
            }
            className={`item-wrapper ${
              selectedItems.includes(item.itemId) ? 'selected' : ''
            }`}
            onClick={() => handleItemClick(item.itemId)}
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
            onClick={() => {
              router.push(`/additem?postId=${postId}`);
            }}
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

export default withAuthorization(Page, ['user']);
