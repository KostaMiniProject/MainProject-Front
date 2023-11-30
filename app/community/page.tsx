'use client';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import Carousel from '@/components/carousel/Carousel';
import React from 'react';
import { MdComment, MdSearch } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

function page() {
  return (
    <div>
      <Header title="커뮤니티"></Header>
      <div className="border-gray border-solid border-y-[0.5px]">
        <div className="flex mx-[15px] my-[5px] ">
          <InputBox onChange={() => {}}></InputBox>
          <div className="items-center justify-center flex">
            <MdSearch size={40} />
          </div>
        </div>
      </div>
      <div className="mx-[15px]">
        <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[5px] my-[5px]">
          <div></div>
          <div className="w-full ">
            <div className="flex mb-[5px]">
              <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
              <div>닉네임 . 날짜</div>
            </div>
            <div className="w-full h-[250px]">
              <Carousel images={[{}, {}]}></Carousel>
            </div>
            <div className="text-[20px] font-[600] my-[5px]">제목</div>
            <div className="whitespace-nowrap text-ellipsis overflow-hidden my-[5px]">
              내용내용내용내용
            </div>
            <div className="flex justify-between">
              <div>
                <div className="flex">
                  <FaRegHeart />
                  <FaHeart />
                  <div className="leading-none">0</div>
                </div>
              </div>
              <div className="flex">
                <MdComment />
                <div className="leading-none">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
