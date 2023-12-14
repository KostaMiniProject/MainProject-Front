'use client';
import React from 'react';

function ButtonClass(
  height: number,
  fontSize: number,
  btnStyle: string,
  rounded: string
) {
  let roundedResult = `rounded-[20px]`;
  if (rounded === 'rounded') {
    roundedResult = `rounded-[20px]`;
  } else if (rounded === 'soft') {
    roundedResult = `rounded-[5px]`;
  } else if (rounded === 'none') {
    roundedResult = ``;
  }
  let result = `bg-base text-white rounded-[20px] px-[10px]  ${roundedResult}`;
  if (btnStyle === 'tag') {
    result = `bg-white text-black border-solid border-base border-[1px] ${roundedResult} px-[10px] `;
  } else if (btnStyle === 'disable') {
    result = `bg-gray text-white px-[10px]  ${roundedResult}`;
  } else {
    result = `bg-base text-white px-[10px]  ${roundedResult}`;
  }
  return result;
}

function Button({
  text,
  height = 0,
  fontSize = 12,
  btnStyle = 'active',
  rounded = 'rounded',
  onClick,
}: {
  text: string;
  height?: number;
  fontSize?: number;
  btnStyle?: string;
  rounded?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={ButtonClass(height, fontSize, btnStyle, rounded)}
      onClick={onClick}
      style={{ padding: `${height}px`, fontSize: `${fontSize}px`, textAlign: 'center' }}
    >
      {text}
    </div>
  );
}

export default Button;
