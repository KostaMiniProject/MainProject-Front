'use client';
import type { ChangeEvent } from "react";
import { useState } from "react";

type HandleInput = (e: ChangeEvent<HTMLTextAreaElement>) => void;

type UseInputLength = (
  MAX_LENGTH: number,
) => [inputCount: number, handleInput: HandleInput];

const useInputLength: UseInputLength = (MAX_LENGTH: number) => {
  const [inputCount, setInputCount] = useState(0);
  const handleInput: HandleInput = (e) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(e.target.value.length);
  };
  return [inputCount, handleInput];
};

export default useInputLength;