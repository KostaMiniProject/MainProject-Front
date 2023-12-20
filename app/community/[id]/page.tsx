'use client';
import Header from '@/components/Header';
import Carousel from '@/components/carousel/Carousel';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa';
import Profile from '@/components/Profile';
import { putCommunityPostLike } from '@/apis/CommunityApi';

// const communityTag = [
//   '#식품',
//   '#생활용품',
//   '#카테고리'
// ]

function Comment({ comment }: { comment: any }) {
  return (
    <div key={comment.id} className="my-[10px]">
      <div className="flex mb-[5px] w-full border-b-[0.5px] border-gray">
        {comment.parent_id === null ? <></> : <div className="w-[40px]"></div>}
        <div className="w-[25px] h-[25px] bg-gray rounded-[50%]"></div>
        <div className="ml-[15px]">
          <div className="flex items-center text-gray mr-[10px]">
            {comment.profile.name} <FaAngleRight size={15} />
          </div>
          <div className="text-gray mr-[10px] text-subtitle">
            {comment.created_at}
          </div>
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
const post = {
  user: {
    address: '오리동',
    email: 'a@a.com',
    name: '닉넴',
    phone: '010',
    profileImage: '',
    rating: 5,
    userId: 2,
  },
  communityPostId: 3,
  communityPostStatus: 'PUBLIC',
  content: '컨텐츠 내용입니다',
  date: '2023년 12월',
  imageUrl: '',
  isPressLike: true,
  likeCount: 5,
  postOwner: true,
  title: '글 제목',
};
const comments = [
  {
    id: 0,
    profile: {
      id: 0,
      name: '김',
      imageUrl: '',
      rating: 5,
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
      imageUrl: '',
      rating: 5,
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
      imageUrl: '',
      rating: 5,
    },
    parent_id: null,
    content: '가쩔어',
    created_at: '2023-11-30',
  },
];

function page() {
  const [data, setData] = useState();

  // useEffect(() => {
  //   setData(post);
  // }, [post]);
  const handleLike = async () => {
    try {
      await putCommunityPostLike(post.communityPostId);
      setData((prev: any) => ({
        ...prev,
        isPressLike: !prev.isPressLike,
        likeCount: prev.isPressLike ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    } catch (error) {
      alert('로그인이 필요합니다');
      console.log(error);
    }
    // console.log(data?.isPressLike);
  };
  const handleDeletePost = () => {
    alert('delete post');
  };
  return (
    <div>
      <Header backNav title={post.title}>
        {post?.postOwner && (
          <div className="cursor-pointer" onClick={handleDeletePost}>
            <MdDeleteForever size={40} />
          </div>
        )}
      </Header>
      <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[15px] my-[5px]">
        <div></div>
        <div className="w-full ">
          {/* <div className="flex mb-[10px]">
            <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
            <div className="flex justify-center items-center text-gray ml-[10px]">
              {post.user.name}
              <FaAngleRight size={15} />
            </div>
          </div> */}
          <Profile
            profile={{
              ...post.user,
              imageUrl: post.user.profileImage,
              id: post.user.userId,
            }}
          />
          <div className="w-[100%] h-[auto]">
            {/* 캐러셀에 대한 설정 */}
            <Carousel images={[{}, {}]}></Carousel>
          </div>
          <div className="flex justify-between my-[5px]">
            <div className="flex cursor-pointer">
              {post?.isPressLike ? (
                <div className="mr-[5px]" onClick={handleLike}>
                  <FaHeart color={'red'} size={25} />
                </div>
              ) : (
                <div className="mr-[5px]" onClick={handleLike}>
                  <FaRegHeart size={25} />
                </div>
              )}
            </div>
          </div>
          <div className="flex text-[20px] font-[600] mt-[5px]">
            {post.title}
          </div>
          <div className="text-gray mr-[10px] text-subtitle">{post.date}</div>

          <div className="whitespace-nowrap text-ellipsis overflow-hidden mb-[5px]">
            {post.content}
          </div>
        </div>
      </div>
      <div className="mx-[15px]">
        <div className="flex text-[20px] font-[600] mt-[5px] underline">
          댓글
        </div>
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
