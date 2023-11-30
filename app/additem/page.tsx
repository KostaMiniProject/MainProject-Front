'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import TextAreaBox from '@/components/TextAreaBox';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdAddCircleOutline, MdCancel } from 'react-icons/md';

function Page() {
  const [title, setTitle] = useState<String>('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isMoreView, setIsMoreView] = useState<Boolean>(false);

  function handleMoreView() {
    setIsMoreView(!isMoreView);
  }
  function removeImage(index: number) {
    // 이미지 삭제
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setSelectedImages((prevImages) => {
      // 이전 이미지 배열에 새로운 이미지 배열을 추가
      // 현재 이미지 배열과 새로운 이미지 배열의 합이 5를 초과하면 슬라이스하여 최대 5개로 제한
      const newImages = [...prevImages, ...Array.from(files)];
      return newImages.length > 5 ? newImages.slice(0, 5) : newImages;
    });
  }

  function postComplete() {
    alert('asdf');
  }
  function openFileInput() {
    // 파일 입력 엘리먼트를 클릭하여 파일 선택 다이얼로그 열기
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  return (
    <div>
      <Header backNav title="아이템 추가"></Header>
      <div
        className="bg-softbase flex"
        style={isMoreView ? {} : { height: '140px', overflow: 'hidden' }}
      >
        <div className="flex flex-wrap flex-1 p-[5px]">
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative w-[120px] h-[120px] overflow-hidden m-[5px] border-base border-solid border-[1px] rounded-[10px]"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`Selected Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => removeImage(index)}
              >
                <MdCancel size={30} color={'#e00685'} />
              </div>
            </div>
          ))}
          {selectedImages.length < 5 ? (
            <div
              className="relative w-[120px] h-[120px] overflow-hidden m-[5px] flex items-center justify-center border-base border-solid border-[1px] rounded-[10px]"
              onClick={openFileInput}
            >
              <MdAddCircleOutline size={30} color={'#e00685'} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          onClick={handleMoreView}
          className="bg-base rounded-[5px] m-[10px] h-[120px] w-[60px] flex items-center justify-center cursor-pointer"
        >
          <div className="text-white">{isMoreView ? '▲' : '▼'}</div>
        </div>
      </div>
      <input
        id="fileInput" // 파일 입력 엘리먼트에 ID 추가
        type="file"
        multiple
        accept=".jpg, .png"
        onChange={handleFileChange}
        style={{ display: 'none' }} // 화면에 표시되지 않도록 함
      />
      <div>
        <div className="mx-[15px]">
          <div className="my-[5px]">
            <div className="text-[20px] font-[600] flex">▶제목</div>
            <InputBox onChange={setTitle} />
          </div>
          <div className="my-[5px]">
            <div className="text-[20px] font-[600] flex">▶상세 설명</div>
            <TextAreaBox onChange={setTitle}></TextAreaBox>
          </div>
          <div className="text-center my-[15px]">
            <Button
              text="작성 완료"
              fontSize={20}
              height={8}
              rounded="soft"
              onClick={postComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
