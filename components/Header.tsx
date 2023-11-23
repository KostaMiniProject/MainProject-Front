'use client';
import React from 'react';
import { MdMoreVert } from 'react-icons/md';
import Logo from '@/image/Logo.png';
import Image from 'next/image';

function Header() {
  return (
    <div className="sticky top-0 w-full z-500 max-w-[480px]">
      <div className="flex h-[60px] bg-white">
        <div className="w-[60px] bg-base flex items-center justify-center relative">
          <div className="">
            <Image src={Logo} alt="logo" width={500} height={100} />
          </div>
        </div>
        <div className="flex-1 flex items-center m-[10px] text-[24px] font-[800]">
          헤더내용
        </div>
        <div className="w-[60px] bg-gray-300 flex items-center justify-center">
          <MdMoreVert size={30} />
        </div>
      </div>
    </div>
  );
}

export default Header;
