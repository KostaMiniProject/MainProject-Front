'use client';
import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdArrowBack, MdOutlineSearch } from 'react-icons/md';

function page() {
  const [keyWord, setKeyWord] = useState<string>('');
  const route = useRouter();
  const category = [
    '자동차용품',
    '가전제품',
    '의류',
    '악세서리',
    '컴퓨터',
    '게임',
    '생활용품',
    '캠핑용품',
    '청소도구',
    '주방용품',
    '전자기기',
  ];
  return (
    <div>
      <div className="h-[60px] flex items-center border-b-[1px] border-gray">
        <div onClick={route.back}>
          <MdArrowBack size={60} />
        </div>
        <InputBox onChange={setKeyWord} onFocusChange={(bool) => {}} />
        <div
          onClick={() => {
            console.log(keyWord);
          }}
        >
          <MdOutlineSearch size={40} />
        </div>
      </div>
      <div className="text-[16px] font-[600] border-b-[0.5px] border-gray p-[10px]">
        카테고리
      </div>
      <div className="flex flex-wrap">
        {category.map((e: any, i: any) => {
          return (
            <div className="m-[5px]" key={i}>
              <Button text={e} fontSize={16} height={8} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
