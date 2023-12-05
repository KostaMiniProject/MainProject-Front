import React from 'react';
import Carousel from '../carousel/Carousel';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdComment } from 'react-icons/md';

function CommunityPost() {
  return (
    <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[5px] my-[5px]">
      <div></div>
      <div className="w-full ">
        <div className="flex mb-[5px]">
          <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
          <div>닉네임 . 날짜</div>
        </div>
        <div className="w-[100%] h-[auto]">
          {/* 캐러셀에 대한 설정 */}
          <Carousel images={[{}, {}]}></Carousel>
        </div>
        <div className="text-[20px] font-[600] my-[5px]">제목</div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden my-[5px]">
          내용내용내용내용
        </div>
        <div className="flex justify-between">
          <div>
            <div className="flex">
              <FaRegHeart size={25} />
              <FaHeart size={25} />
              <div className="leading-none">0</div>
            </div>
          </div>
          <div className="flex">
            <MdComment size={25} />
            <div className="leading-none">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPost;
