import React from 'react';

function ButtonClass(height: number, fontSize: number, btnStyle: string) {
  let result = `bg-base text-white rounded-[20px] px-[10px] m-[2.5px]`;
  if (btnStyle === 'tag') {
    result = `bg-white text-black border-solid border-base border-[1px] rounded-[20px] px-[10px] m-[2.5px]`;
  } else if (btnStyle === 'disable') {
    result = `bg-gray text-white rounded-[20px] px-[10px] m-[2.5px] `;
  } else {
    result = `bg-base text-white rounded-[20px] px-[10px] m-[2.5px]`;
  }
  return result;
}

function Button({
  text,
  height = 0,
  fontSize = 12,
  btnStyle = 'active',
  onClick,
}: {
  text: string;
  height?: number;
  fontSize?: number;
  btnStyle?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={ButtonClass(height, fontSize, btnStyle)}
      onClick={onClick}
      style={{ padding: `${height}px`, fontSize: `${fontSize}px` }}
    >
      {text}
    </div>
  );
}

export default Button;
