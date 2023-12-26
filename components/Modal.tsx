import React from 'react';
import { MdClear } from 'react-icons/md';

function Modal({
  children,
  setState,
}: {
  children?: React.ReactNode;
  setState?: () => void;
}) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
      <div className="bg-white p-[10px] rounded-md my-[5px]">
        <div className="flex justify-end">
          <div onClick={setState} className="cursor-pointer">
            <MdClear size={20} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
