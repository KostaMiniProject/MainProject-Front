'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Link from 'next/link';

function Success() {
  const router = useRouter();

  const searchParams = useSearchParams();

  return (
    <div className="container mx-auto mt-10">
      <Header title="비밀번호 찾기"></Header>
      <div className="w-full flex-col flex">
        <div className="text-[12px] mt-[100px] mb-[10px] m-[auto] ">
          아래 이메일 주소로{' '}
          <span className="font-bold underline">임시 비밀번호</span>가 발송
          되었습니다 :)
        </div>
      </div>
      <div className="flex-col flex border border-gray p-5 rounded-md mb-[15px] mx-default">
        <div className="text-[16px] m-[auto] font-[600]">
          이메일 : {searchParams.get('email')}
        </div>
      </div>
      <div className="w-full flex-col flex">
        <div className="text-[12px] mb-[25px] m-[auto] text-red">
          로그인 후 보안을 위해 비밀번호를 변경해주세요.
        </div>
      </div>
      <div className="flex justify-between mx-default">
        <div className="w-[100%]">
          <Link href={'/login'}>
            <Button text="로그인" fontSize={10} height={8} rounded="soft" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
