import Header from '@/components/Header';
import Carousel from '@/components/carousel/Carousel';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdComment } from 'react-icons/md';

function Comment({ comment }: { comment: any }) {
  return (
    <div key={comment.id} className="my-[10px]">
      <div className="flex mb-[5px]">
        {comment.parent_id === null ? <></> : <div className="w-[40px]"></div>}
        <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
        <div>
          {comment.profile.name} . {comment.created_at}
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
      <div className="w-full p-[10px] flex my-[5px]">
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
          <div className=" my-[5px]">
            내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
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
      <div className="mx-[15px]">
        <div>댓글</div>
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
