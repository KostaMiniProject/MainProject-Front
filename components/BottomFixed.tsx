import React from 'react';

function BottomFixed({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-[100px] max-w-[480px] w-full px-[15px]">
      <div className="flex justify-between">{children}</div>
    </div>
  );
}

export default BottomFixed;
