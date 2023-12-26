'use client';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import Image from 'next/image';
import Modal from '../Modal';
import Button from '../Button';

function Carousel({
  images,
  disable = false,
}: {
  images: any;
  disable?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (images) {
      const img = new window.Image();
      img.src = images[currentIndex];
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
    }
  }, [currentIndex, images]);

  const handleShowModal = () => {
    if (!disable) setShowModal(true);
  };

  const handlePostComplete = async () => {
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const nextImage = () => {
    if (!disable)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    if (!disable)
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
  };

  return (
    <div className="relative w-full h-0 pb-[70%] overflow-hidden bg-black">
      <div className="flex absolute top-0 left-0 w-full h-full transition-transform">
        {images?.map((src: any, index: any) => (
          <div
            key={index}
            className="z-20"
            onClick={() => {
              handleShowModal();
            }}
          >
            <Image
              key={index}
              src={src}
              alt={`carouselImage-${index}`}
              fill
              priority
              sizes="(max-width: 480px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="duration-300"
              style={{
                objectFit: 'cover',
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between absolute top-0 w-full h-full">
        <div className="my-auto z-30" onClick={prevImage}>
          <MdKeyboardArrowLeft size={40} color="gray" />
        </div>
        <div className="my-auto z-30" onClick={nextImage}>
          <MdKeyboardArrowRight size={40} color="gray" />
        </div>
      </div>
      {showModal && (
        <Modal setState={handleCloseModal}>
          <div
            className="w-full h-full"
            style={{
              maxWidth: imageSize.width,
              maxHeight: imageSize.height,
            }}
          >
            {images && (
              <Image
                src={images[currentIndex]}
                alt={`carouselImage-${currentIndex}`}
                fill
                style={{ objectFit: 'contain' }}
                onClick={handleCloseModal}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Carousel;
