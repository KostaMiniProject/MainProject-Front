import React from 'react';

function BottomFixed({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-[60px] max-w-[480px] w-full ">{children}</div>
  );
}

export default BottomFixed;
