'use client';
import { withAuthorization } from '@/HOC/withAuthorization';
import {
  getExchangePost,
  postExchangePost,
  updateExchangePost,
} from '@/api/ExchangePostApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import TextAreaBox from '@/components/TextAreaBox';
import Item, { itemType } from '@/components/item/Item';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface postContent {
  title: string;
  address: string;
  preferItems: string;
  content: string;
  item: {
    itemId: number;
    title: string;
    description: string;
    images: any;
    createdAt: string;
  };
}

function page({ params }: { params: any }) {
  const [title, setTitle] = useState<string>('');
  const [preferItems, setPreferItems] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<itemType>();
  const [postContent, setPostContent] = useState<postContent>();
  const router = useRouter();

  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const data = await getExchangePost(params.id);
        console.log(data);
        setPostContent(data);
      } catch (error) {
        console.error('Error fetching exchange post data:', error);
      }
    };
    fetchPostContent();
  }, [params.id]);

  useEffect(() => {
    if (postContent) {
      setTitle(postContent.title);
      setPreferItems(postContent.preferItems);
      setAddress(postContent.address);
      setContent(postContent.content);
      setSelectedItem(postContent.item);
    }
  }, [postContent]);

  function updatePost() {
    const body = {
      title: title,
      preferItems: preferItems,
      address: address,
      content: content,
    };
    try {
      updateExchangePost(body, params.id);
      alert('수정완료');
      router.push(`/exchange/${params.id}`);
    } catch (error) {
      console.log(error);
    }
  }

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
          <div className="text-header font-[600] flex">제목</div>
          <InputBox onChange={setTitle} content={title} />
        </div>
        <div className="my-[5px]">
          <div className="text-header font-[600] flex">선호 물건</div>
          <InputBox onChange={setPreferItems} content={preferItems} />
        </div>
        <div className="my-[5px]">
          <div className="text-header font-[600] flex">상세 설명</div>
          <TextAreaBox onChange={setContent} content={content}></TextAreaBox>
        </div>
        <div className="my-[5px]">
          <div className="text-header font-[600] flex">거래희망 장소</div>
          <InputBox onChange={setAddress} content={address} />
        </div>
        <div className="text-center my-[15px]">
          <Button
            text="작성 완료"
            fontSize={20}
            height={8}
            rounded="soft"
            onClick={updatePost}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(page, ['user']);
