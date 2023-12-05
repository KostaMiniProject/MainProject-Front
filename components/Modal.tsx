import React from 'react';

function Modal({
  children,
  setState,
}: {
  children?: React.ReactNode;
  setState?: () => void;
}) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
      <div className="bg-white p-[15px] rounded-md">
        {children}
        <button onClick={setState}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
