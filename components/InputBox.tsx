"use client";
import React, { useState } from "react";
// ...

function InputBox({
  onChange,
  onFocusChange,
  type = "text",
  content,
  message,
}: {
  onChange: (value: string) => void;
  onFocusChange?: (isFocused: boolean) => void;
  type?: string;
  content?: string;
  message?: string;
}) {
  const [color, setColor] = useState("");

  function handleFocus() {
    setColor("border-base");
    if (onFocusChange) {
      onFocusChange(true); // 포커스되었을 때 이벤트 실행
    }
  }

  function handleBlur() {
    setColor("border-gray");
    if (onFocusChange) {
      onFocusChange(false); // 포커스가 해제되었을 때 이벤트 실행
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={`border-[0.5px] rounded-[8px] h-[40px] flex-1 ${color}`}>
      <input
        type={type}
        className="w-full h-full p-2 outline-none border-transparent bg-transparent text-subtitle"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={content}
        placeholder={message}
      />
    </div>
  );
}

export default InputBox;
