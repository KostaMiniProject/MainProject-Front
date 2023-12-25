'use client';
import React, { forwardRef, useState } from 'react';

interface TextAreaProps {
  onChange: (value: string) => void;
  content?: string;
  maxLength?: number;
  rows?: number;
}

const TextAreaBox = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ onChange, content, maxLength = 500, rows = 8 }, ref) => {
    const [color, setColor] = useState('');

    const handleFocus = () => {
      setColor('border-base');
    };

    const handleBlur = () => {
      setColor('border-gray');
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      onChange(value);
    };

    return (
      <div className={`border-[0.5px] rounded-[8px]  flex-1 ${color}`}>
        <textarea
          rows={rows}
          className="resize-none w-full h-full p-2 outline-none border-transparent bg-transparent text-subtitle"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={content}
          maxLength={maxLength}
        />
      </div>
    );
  }
);

export default TextAreaBox;
