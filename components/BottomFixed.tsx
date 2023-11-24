import React from 'react';

function BottomFixed({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-[80px] max-w-[480px] w-full px-[15px]">
      {children}
    </div>
  );
}

export default BottomFixed;
