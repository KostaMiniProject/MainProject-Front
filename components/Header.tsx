'use client';
import React from 'react';
import { MdArrowBack, MdMoreVert } from 'react-icons/md';
import Logo from '@/image/Logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Header({
  children,
  title = '',
  backNav = false,
}: {
  children?: React.ReactNode;
  title?: string;
  backNav?: boolean;
}) {
  const route = useRouter();
  return (
    <div className="sticky top-0 w-full z-500 max-w-[480px] z-[9999]">
      <div className="flex h-[60px] bg-white">
        <div className="w-[60px]  flex items-center justify-center relative">
          {backNav ? (
            <div onClick={route.back}>
              <MdArrowBack size={60} />
            </div>
          ) : (
            <Image src={Logo} alt="logo" width={500} height={100} />
          )}
        </div>
        <div className="flex-1 flex items-center m-[10px] text-[24px] font-[800] whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </div>
        <div className="bg-gray-300 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Header;
