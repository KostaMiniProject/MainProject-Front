'use client';
import React, { useState } from 'react';
import Logo from '@/image/Logo.png';
import Image from 'next/image';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

function page() {
  const [email, setEmail] = useState<String>('');
  const router = useRouter();
  function handleSignUp() {
    router.push('/signup');
  }
  return (
    <div>
      <div className="w-full flex-col flex items-center text-center justify-center my-[60px]">
        <div className="text-5xl mb-[20px]">가치잇솝</div>
        <Image src={Logo} width={120} height={120} alt="로고"></Image>
      </div>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-[20px] my-[10px] font-[600]">이메일</div>
          <InputBox onChange={setEmail}></InputBox>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호</div>
          <InputBox onChange={setEmail} type="password"></InputBox>
        </div>
        <div className="text-center my-[20px]">
          <Button
            text="로그인 하기"
            fontSize={18}
            height={5}
            rounded="soft"
          ></Button>
        </div>
        <div className="flex items-center justify-center text-[14px] text-gray">
          <div>아이디 찾기</div>
          <div className="mx-[10px]">|</div>
          <div>비밀번호 찾기</div>
          <div className="mx-[10px]">|</div>
          <div onClick={handleSignUp}>회원 가입</div>
        </div>
      </div>
    </div>
  );
}

export default page;
