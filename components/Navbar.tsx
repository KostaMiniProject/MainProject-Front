'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  MdViewInAr,
  MdOutlineArticle,
  MdMap,
  MdChat,
  MdPerson,
} from 'react-icons/md';

const iconSize: number = 25;
const baseColor: string = '#FFD1D1';

function flexClasses(active: boolean) {
  return (
    'flex-1 flex flex-col items-center justify-center h-[100%]' +
    (active ? ' ' : '')
  );
}

function Navbar() {
  const [activeButton, setActiveButton] = useState('물물교환');
  const router = useRouter();

  function handleButtonClick(buttonName: string) {
    setActiveButton(buttonName);
  }

  return (
    <div className="fixed bottom-0 w-full z-[9999] max-w-[480px] bg-white">
      <div className="flex items-center h-[60px] text-subtitle cursor-pointer">
        <div
          className={flexClasses(activeButton === '물물교환')}
          onClick={() => {
            handleButtonClick('물물교환');
            router.push('/');
          }}
        >
          <MdViewInAr
            size={iconSize}
            color={activeButton === '물물교환' ? baseColor : 'black'}
          />
          <div>물물교환</div>
        </div>
        <div
          className={flexClasses(activeButton === '커뮤니티')}
          onClick={() => {
            handleButtonClick('커뮤니티');
            router.push('/community');
          }}
        >
          <MdOutlineArticle
            size={iconSize}
            color={activeButton === '커뮤니티' ? baseColor : 'black'}
          />
          <div>커뮤니티</div>
        </div>
        <div
          className={flexClasses(activeButton === '지도')}
          onClick={() => {
            handleButtonClick('지도');
            router.push('/map');
          }}
        >
          <MdMap
            size={iconSize}
            color={activeButton === '지도' ? baseColor : 'black'}
          />
          <div>지도</div>
        </div>
        <div
          className={flexClasses(activeButton === '채팅')}
          onClick={() => {
            handleButtonClick('채팅');
            router.push('/chatting');
          }}
        >
          <MdChat
            size={iconSize}
            color={activeButton === '채팅' ? baseColor : 'black'}
          />
          <div>채팅</div>
        </div>
        <div
          className={flexClasses(activeButton === '마이페이지')}
          onClick={() => {
            handleButtonClick('마이페이지');
            router.push('/profile');
          }}
        >
          <MdPerson
            size={iconSize}
            color={activeButton === '마이페이지' ? baseColor : 'black'}
          />
          <div>마이페이지</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
