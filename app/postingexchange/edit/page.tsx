'use client';
import { withAuthorization } from '@/HOC/withAuthorization';
import { postExchangePost } from '@/api/ExchangePostApi';
import { getItemById } from '@/api/ItemApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import TextAreaBox from '@/components/TextAreaBox';
import Item, { itemType } from '@/components/item/Item';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface postContent {
  title: string;
  address: string;
  preferItems: string;
  content: string;
  selectedItem: {
    itemId: number;
    title: string;
    description: string;
    images: any;
    createdAt: string;
  };
}
const dumy: postContent = {
  title: '타이틀',
  address: '주소',
  preferItems: '원하는 아이템',
  content: '내용내용',
  selectedItem: {
    itemId: 3,
    title: '아이템 이름',
    description: '아이템 내용',
    images: '',
    createdAt: '생성날짜',
  },
};

function page() {
  const [title, setTitle] = useState<string>('');
  const [preferItems, setPreferItems] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<itemType>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlPath = usePathname();

  function postComplete() {}

  function selectItem() {}

  useEffect(() => {
    const data = dumy;
    setTitle(data.title);
    setPreferItems(data.preferItems);
    setAddress(data.address);
    setContent(data.content);
    setSelectedItem(data.selectedItem);
  }, []);

  return (
    <div>
      <Header backNav title="교환 게시글 작성"></Header>
      <div className="mx-[15px] bg-white">
        {/* Item 컴포넌트 사용 */}
        {selectedItem ? (
          <Item item={selectedItem} />
        ) : (
          <div>선택된 아이템이 없습니다.</div>
        )}
      </div>
      <div className="mx-[15px]">
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶제목</div>
          <InputBox onChange={setTitle} content={title} />
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶선호 물건</div>
          <InputBox onChange={setPreferItems} content={preferItems} />
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶상세 설명</div>
          <TextAreaBox onChange={setContent} content={content}></TextAreaBox>
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶거래희망 장소</div>
          <InputBox onChange={setAddress} content={address} />
        </div>
        <div className="text-center my-[15px]">
          <Button
            text="작성 완료"
            fontSize={20}
            height={8}
            rounded="soft"
            onClick={postComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(page, ['user']);
