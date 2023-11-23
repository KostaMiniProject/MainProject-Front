import React from 'react';

function hashTagClass(height: number) {
  return (
    `py-[${height}px]` +
    ' m-[2.5px] bg-base rounded-[25px] inline-block float-right px-[15px] text-white font-[600]'
  );
  //  + ` py-[${height}px]`
}

function HashTag({
  text,
  height = 0,
  onClick,
}: {
  text: string;
  height?: number;
  onClick?: () => void;
}) {
  return (
    <div className={hashTagClass(height)} onClick={onClick}>
      {text}
    </div>
  );
}

export default HashTag;
