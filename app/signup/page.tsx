'use client';
import React, { useState } from 'react';
import Logo from '@/image/Logo.png';
import Image from 'next/image';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import Header from '@/components/Header';

function page() {
  const [email, setEmail] = useState<String>('');
  return (
    <div>
      <Header backNav title="회원가입"></Header>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-[20px] my-[10px] font-[600]">이름</div>
          <InputBox onChange={setEmail}></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600]">이메일</div>
          <InputBox onChange={setEmail}></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600]">전화번호</div>
          <InputBox onChange={setEmail}></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600]">주소</div>
          <InputBox onChange={setEmail}></InputBox>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호</div>
          <InputBox onChange={setEmail} type="password"></InputBox>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호 확인</div>
          <InputBox onChange={setEmail} type="password"></InputBox>
        </div>
        <div className="text-center my-[20px]">
          <Button
            text="회원가입 하기"
            fontSize={18}
            height={5}
            rounded="soft"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default page;
