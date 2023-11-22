// 'use client';
import React from 'react';
import { MdMoreVert } from 'react-icons/md';

function Header() {
  return (
    <div className="flex h-[60px] bg-white">
      <div className="w-[60px] bg-gray-400 flex items-center justify-center">
        <div className="">Icon</div>
      </div>
      <div className="flex-1  flex items-center m-[10px] text-[24px] font-[800]">
        헤더내용
      </div>
      <div className="w-[60px] bg-gray-300 flex items-center justify-center">
        <MdMoreVert size={30} />
      </div>
    </div>
  );
}

export default Header;
