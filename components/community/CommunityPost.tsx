import React from 'react';
import Carousel from '../carousel/Carousel';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { MdChatBubbleOutline } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { FaAngleRight } from 'react-icons/fa';

const communityTag = ['#식품', '#생활용품', '#카테고리'];
const images = ['', ''];

function CommunityPost({ postItem }: { postItem?: any }) {
  return (
    <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[5px] my-[5px]">
      <div></div>
      <div className="w-full ">
        <div className="flex mb-[10px]">
          <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
          <div className="flex justify-center items-center text-gray ml-[10px]">
            닉네임
            <FaAngleRight size={15} />
          </div>
        </div>
        <div className="w-[100%] h-[auto]">
          {/* 캐러셀에 대한 설정 */}
          {postItem && <Carousel images={postItem}></Carousel>}
        </div>
        <div className="flex justify-between my-[5px]">
          <div className="flex">
            <FaRegHeart size={25} />
            <FaHeart size={25} />
            <MdChatBubbleOutline size={25} />
            <IoIosSend size={25} />
          </div>
          <div className="flex">
            <MdBookmarkBorder size={25} />
            <MdBookmark size={25} />
          </div>
        </div>
        <div className="flex text-[20px] font-[600] mt-[5px]">제목</div>
        <div className="text-gray mr-[10px] text-subtitle">날짜</div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          물건명
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          구매일
        </div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden mb-[5px]">
          상세 설명 등 기타
        </div>
        <div className="flex flex-wrap">
          {communityTag.map((e: any, i: any) => {
            return (
              <div className="m-[5px] text-subtitle" key={i}>
                {e}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CommunityPost;
