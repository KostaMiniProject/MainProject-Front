'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import TextAreaBox from '@/components/TextAreaBox';
import Image from 'next/image';
import React, { useState } from 'react';

function Page() {
  const [title, setTitle] = useState<String>('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isMoreView, setIsMoreView] = useState<Boolean>(false);

  function handleMoreView() {
    setIsMoreView(!isMoreView);
  }

  function handleFileChange(event: any) {
    const files = event.target.files;
    setSelectedImages(Array.from(files));
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
        {/* overflow-x-auto를 추가 */}
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
            </div>
          ))}
          <div
            className="relative w-[120px] h-[120px] overflow-hidden m-[5px] flex items-center justify-center border-base border-solid border-[1px] rounded-[10px]"
            onClick={openFileInput}
          >
            <div>+</div>
          </div>
        </div>
        <div
          onClick={handleMoreView}
          className="bg-base h-[120px] w-[80px] flex items-center justify-center cursor-pointer"
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
