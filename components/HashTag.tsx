import React from 'react';

function hashTagClass(height: number, fontSize: number) {
  return (
    `py-[${height}px] text-[${fontSize}px]` +
    ' bg-base text-white rounded-[20px] px-[10px] m-[2.5px]'
  );
}

function HashTag({
  text,
  height = 0,
  fontSize = 12,
  onClick,
}: {
  text: string;
  height?: number;
  fontSize?: number;
  onClick?: () => void;
}) {
  return (
    <div className={hashTagClass(height, fontSize)} onClick={onClick}>
      {text}
    </div>
  );
}

export default HashTag;
