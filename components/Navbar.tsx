'use client';
import React, { useState } from 'react';
import {
  MdViewInAr,
  MdOutlineArticle,
  MdMap,
  MdChat,
  MdPerson,
} from 'react-icons/md';

function flexClasses(active: boolean) {
  return (
    'flex-1 flex flex-col items-center justify-center h-[100%]' +
    (active ? ' bg-gray-300' : '')
  );
}

function Navbar() {
  const [activeButton, setActiveButton] = useState('물물교환');

  function handleButtonClick(buttonName: string) {
    setActiveButton(buttonName);
  }

  return (
    <div className="fixed bottom-0 w-full z-500 max-w-[480px] bg-white ">
      <div className="flex items-center h-[60px] text-sm cursor-pointer">
        <div
          className={flexClasses(activeButton === '물물교환')}
          onClick={() => handleButtonClick('물물교환')}
        >
          <MdViewInAr size={20} />
          <div>물물교환</div>
        </div>
        <div
          className={flexClasses(activeButton === '커뮤니티')}
          onClick={() => handleButtonClick('커뮤니티')}
        >
          <MdOutlineArticle size={20} />
          <div>커뮤니티</div>
        </div>
        <div
          className={flexClasses(activeButton === '지도')}
          onClick={() => handleButtonClick('지도')}
        >
          <MdMap size={20} />
          <div>지도</div>
        </div>
        <div
          className={flexClasses(activeButton === '채팅')}
          onClick={() => handleButtonClick('채팅')}
        >
          <MdChat size={20} />
          <div>채팅</div>
        </div>
        <div
          className={flexClasses(activeButton === '마이페이지')}
          onClick={() => handleButtonClick('마이페이지')}
        >
          <MdPerson size={20} />
          <div>마이페이지</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
