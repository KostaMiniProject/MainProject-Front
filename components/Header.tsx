'use client';
import React from 'react';
import { MdArrowBack, MdMoreVert } from 'react-icons/md';
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
        {backNav && (
          <div className="w-[40px]  flex items-center justify-center relative">
            <div onClick={route.back}>
              <MdArrowBack size={40} />
            </div>
          </div>
        )}
        <div className="w-full items-center m-[10px] text-[24px] font-[800] whitespace-nowrap text-ellipsis overflow-hidden">
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
