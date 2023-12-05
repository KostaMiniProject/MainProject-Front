import React from 'react';

function ProfileContainer({
  children,
  text,
  onClick,
}: {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
}) {
  return (
    <div className="mx-[15px] ">
      <div className="border-base border-[2px] border-solid mt-[5px]">
        <div className="flex justify-between items-center h-8">
          <div className="w-36 bg-base h-full flex items-center justify-center">
            <div className="text-white font-[600] ">{text}</div>
          </div>
          <div onClick={onClick}>더 보기</div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ProfileContainer;
