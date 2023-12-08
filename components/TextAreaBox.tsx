'use client';
import React, { useState } from 'react';

function TextAreaBox({
  onChange,
  content,
}: {
  onChange: (value: string) => void;
  content?: string;
}) {
  const [color, setColor] = useState('');

  const handleFocus = () => {
    setColor('border-base');
  };

  const handleBlur = () => {
    setColor('border-black');
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={`border-[2px] rounded-[20px]  flex-1 ${color}`}>
      <textarea
        rows={8}
        className="resize-none w-full h-full p-2 outline-none border-transparent bg-transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={content}
      />
    </div>
  );
}

export default TextAreaBox;
