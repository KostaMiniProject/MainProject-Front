import React, { forwardRef, useState } from 'react';

interface InputBoxProps {
  onChange: (value: string) => void;
  onFocusChange?: (isFocused: boolean) => void;
  type?: string;
  content?: string;
  message?: string;
  readOnly?: boolean;
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    { onChange, onFocusChange, type = 'text', content, message, readOnly },
    ref
  ) => {
    const [color, setColor] = useState('');

    const handleFocus = () => {
      setColor('border-base');
      if (onFocusChange) {
        onFocusChange(true);
      }
    };

    const handleBlur = () => {
      setColor('border-gray');
      if (onFocusChange) {
        onFocusChange(false);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <div className={`border-[0.5px] rounded-[8px] h-[40px] flex-1 ${color}`}>
        <input
          ref={ref}
          type={type}
          className="w-full h-full p-2 outline-none border-transparent bg-transparent text-subtitle"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={content}
          placeholder={message}
          readOnly={readOnly}
        />
      </div>
    );
  }
);

export default InputBox;
