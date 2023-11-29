'use client';
import React, { useState } from 'react';

function InputBox({
  onChange,
  type = 'text',
}: {
  onChange: (value: string) => void;
  type?: string;
}) {
  const [color, setColor] = useState('');

  const handleFocus = () => {
    setColor('border-base');
  };

  const handleBlur = () => {
    setColor('border-black');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={`border-[2px] rounded-[20px] h-[40px] flex-1 ${color}`}>
      <input
        type={type}
        className="w-full h-full p-2 outline-none border-transparent bg-transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputBox;
