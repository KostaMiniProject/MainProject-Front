'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import TextAreaBox from '@/components/TextAreaBox';
import React, { useState } from 'react';
import { MdArrowRight } from 'react-icons/md';

function page() {
  const [title, setTitle] = useState<String>('');
  function postComplete() {
    alert('asdf');
  }
  return (
    <div>
      <Header backNav title="교환 게시글 작성"></Header>
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
