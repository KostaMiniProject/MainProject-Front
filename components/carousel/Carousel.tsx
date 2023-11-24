'use client';
import { useState } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import Image from 'next/image';

function Carousel({ images }: { images: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 다음 이미지로 이동하는 함수
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 이전 이미지로 이동하는 함수
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div
      className={`relative w-full h-full bg-black  ease-in-out overflow-hidden`}
      style={{
        display: 'flex',
      }}
    >
      {images.map((src: any, index: any) => (
        <Image
          key={index}
          src={src}
          alt={`carouselImage-${index}`}
          className="duration-300 absolute"
          style={{
            width: '100%',
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        />
      ))}
      <div className="flex justify-between w-[100%]">
        <div className=" z-10 my-auto" onClick={prevImage}>
          <MdKeyboardArrowLeft size={40} color="gray" />
        </div>
        <div className=" z-10 my-auto" onClick={nextImage}>
          <MdKeyboardArrowRight size={40} color="gray" />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
