'use client';
import React, { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

function Search() {
  const [color, setColor] = useState('');

  const handleFocus = () => {
    setColor('border-base');
  };

  const handleBlur = () => {
    setColor('border-black');
  };
  return (
    <div className=" h-[60px] flex items-center border-b-[1px] border-gray">
      <div
        className={`border-[1.5px] rounded-[20px] ml-[15px] h-[40px] flex-1 ${color}`}
      >
        <input
          type="text"
          className="w-full h-full p-2 outline-none border-transparent bg-transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <MdOutlineSearch size={40} />
    </div>
  );
}

export default Search;
