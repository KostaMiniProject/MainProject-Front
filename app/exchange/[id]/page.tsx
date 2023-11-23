'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import TempImg from '@/image/Logo.png';

function Page({ params }: { params: any }) {
  const [bodyWidth, setBodyWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseElement = useRef<HTMLDivElement>(null);

  const images = [TempImg, TempImg, TempImg]; // 이미지 배열

  useEffect(() => {
    const handleResize = () => {
      if (baseElement.current) {
        setBodyWidth(baseElement.current.clientWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 다음 이미지로 이동하는 함수
  const nextImage = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 이전 이미지로 이동하는 함수
  const prevImage = () => {
    console.log(currentIndex);

    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  function carousel() {
    return (
      <div
        className={`relative w-full h-[260px] bg-black  ease-in-out overflow-hidden`}
        style={{
          display: 'flex',
        }}
      >
        {images.map((src, index) => (
          <>
            <Image
              src={src}
              alt={`carouselImage-${index}`}
              className="duration-300 absolute"
              style={{
                width: '100%',
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
            />
          </>
        ))}
      </div>
    );
  }

  return (
    <div>
      {carousel()}
      <div className="absolute top-1/2 transform -translate-y-1/2 right-2">
        <button
          onClick={prevImage}
          className="bg-gray-500 px-2 py-1 text-white"
        >
          이전
        </button>
        <button
          onClick={nextImage}
          className="bg-gray-500 px-2 py-1 text-white ml-2"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Page;
