import React from 'react';

function hashTagClass(height: number, fontSize: number) {
  const ch = `py-[${height}px] `;
  const cs = `text-[${fontSize}px] `;
  const result =
    cs + ch + `bg-base text-white rounded-[20px] px-[10px] m-[2.5px]`;
  return result;
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
