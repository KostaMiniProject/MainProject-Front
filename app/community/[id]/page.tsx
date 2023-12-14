import Header from '@/components/Header';
import Carousel from '@/components/carousel/Carousel';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { MdChatBubbleOutline } from 'react-icons/md';
import { IoIosSend } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";

const communityTag = [
  '#식품',
  '#생활용품',
  '#카테고리'
]

function Comment({ comment }: { comment: any }) {
  return (
    <div key={comment.id} className="my-[10px]">
      <div className="flex mb-[5px] w-full border-b-[0.5px] border-gray">
        {comment.parent_id === null ? <></> : <div className="w-[40px]"></div>}
        <div className="w-[25px] h-[25px] bg-gray rounded-[50%]"></div>
        <div className='ml-[15px]'>
          <div className='flex items-center text-gray mr-[10px]'>
            {comment.profile.name} <FaAngleRight size={15} />
          </div>  
          <div className='text-gray mr-[10px] text-subtitle'>{comment.created_at}</div>
          <div>{comment.content}</div>
        </div>  
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-[20px]">
          {comment.replies.map((reply: any) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
function page() {
  const comments = [
    {
      id: 0,
      profile: {
        id: 0,
        name: '김',
        image_url: '',
      },
      parent_id: null,
      content: '와 진짜 쩐다',
      created_at: '2023-11-30',
    },
    {
      id: 1,
      profile: {
        id: 1,
        name: '이',
        image_url: '',
      },
      parent_id: 0,
      content: '쩔긴 뭐가쩔어',
      created_at: '2023-11-30',
    },
    {
      id: 2,
      profile: {
        id: 2,
        name: '박',
        image_url: '',
      },
      parent_id: null,
      content: '가쩔어',
      created_at: '2023-11-30',
    },
  ];

  return (
    <div>
      <Header backNav title="제목"></Header>
      <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[15px] my-[5px]">
        <div></div>
        <div className="w-full ">
          <div className="flex mb-[10px]">
            <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
            <div className='flex justify-center items-center text-gray ml-[10px]'>
              닉네임
              <FaAngleRight size={15} />
            </div>
          </div>
          <div className="w-[100%] h-[auto]">
            {/* 캐러셀에 대한 설정 */}
            <Carousel images={[{}, {}]}></Carousel>
          </div>
          <div className='flex justify-between my-[5px]'>
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
          <div className="text-gray mr-[10px] text-subtitle">
            날짜
          </div>
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
      <div className="mx-[15px]">
      <div className="flex text-[20px] font-[600] mt-[5px] underline">댓글 내역</div>
        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default page;
