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

function page() {
  const [title, setTitle] = useState<String>('');
  const [preferItems, setPreferItems] = useState<String>('');
  const [address, setAddress] = useState<String>('');
  const [content, setContent] = useState<String>('');
  const [selectedItem, setSelectedItem] = useState<itemType>();
  const [edit, setEdit] = useState<number>(0);
  const [postNumber, setPostNumber] = useState<number>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlPath = usePathname();

  function postComplete() {
    let data: any;
    if (selectedItem) {
      data = {
        itemId: searchParams.get('selectedItems'),
        title: title,
        preferItems: preferItems,
        address: address,
        content: content,
      };
      try {
        postExchangePost(data);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data);
  }

  function selectItem() {
    router.push(urlPath + '/selectitem');
  }

  useEffect(() => {
    const selectedItemId = searchParams.get('selectedItems');
    const edit = searchParams.get('edit');
    const post = searchParams.get('post');
    if (selectedItemId) {
      try {
        // 2. getItemById 함수를 비동기로 호출하도록 수정
        getItemById(selectedItemId).then((parsedItem) => {
          setSelectedItem(parsedItem);
        });
      } catch (error) {
        console.error(error);
      }
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
            onClick={selectItem}
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
          <InputBox onChange={setPreferItems} />
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶상세 설명</div>
          <TextAreaBox onChange={setContent}></TextAreaBox>
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶거래희망 장소</div>
          <InputBox onChange={setAddress} />
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
