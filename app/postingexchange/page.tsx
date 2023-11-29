'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import TextAreaBox from '@/components/TextAreaBox';
import Item from '@/components/item/Item';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function page() {
  const [title, setTitle] = useState<String>('');
  const [selectedItem, setSelectedItem] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlPath = usePathname();

  function postComplete() {
    alert('asdf');
  }

  function seletItem() {
    router.push(urlPath + '/selectitem');
  }

  useEffect(() => {
    const selectedItem = searchParams.get('selectedItems');
    if (selectedItem) {
      const parsedItems = JSON.parse(selectedItem);
      setSelectedItem(parsedItems[0]);
    }
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
        <div className="text-center my-[15px]">
          <Button
            text={selectedItem ? '다른 물건 선택하기' : '물건 선택하기'}
            fontSize={20}
            height={8}
            rounded="soft"
            onClick={seletItem}
          />
        </div>
      </div>
      <div className="mx-[15px]">
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶제목</div>
          <InputBox onChange={setTitle} />
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶선호 물건</div>
          <InputBox onChange={setTitle} />
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶상세 설명</div>
          <TextAreaBox onChange={setTitle}></TextAreaBox>
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶거래희망 장소</div>
          <InputBox onChange={setTitle} />
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

export default page;
