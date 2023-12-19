'use client';
import React, { useEffect, useState } from 'react';
import Carousel from '../carousel/Carousel';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { MdChatBubbleOutline } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { FaAngleRight } from 'react-icons/fa';
import Profile from '../Profile';
import { userId } from '@/store/atoms';
import { putCommunityPostLike } from '@/apis/CommunityApi';

interface postType {
  user: {
    address: string;
    email: string;
    name: string;
    phone: string;
    profileImage: string;
    rating: number;
    userId: number;
  };
  commentCount: number;
  communityPostId: number;
  communityPostStatus: string;
  content: string;
  date: string;
  imageUrl: [];
  isPressLike: boolean;
  likeCount: number;
  postOwner: boolean;
  title: string;
}

function CommunityPost({ post }: { post: postType }) {
  const [data, setData] = useState<postType>();

  useEffect(() => {
    setData(post);
  }, [post]);
  const handleLike = () => {
    try {
      putCommunityPostLike(post.communityPostId);
      setData((prev: any) => ({
        ...prev,
        isPressLike: !prev.isPressLike,
        likeCount: prev.isPressLike ? prev.likeCount - 1 : prev.likeCount + 1,
      }));
    } catch (error) {
      console.log(error);
    }
    // console.log(data?.isPressLike);
  };
  return (
    <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[5px] my-[5px]">
      <div></div>
      <div className="w-full ">
        <div className="flex mb-[10px]">
          <Profile
            profile={{
              ...post.user,
              imageUrl: post.user.profileImage,
              id: post.user.userId,
            }}
          />
          {/* <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
          <div className="flex justify-center items-center text-gray ml-[10px]">
            닉네임
            <FaAngleRight size={15} />
          </div> */}
        </div>
        <div className="w-[100%] h-[auto]">
          {/* 캐러셀에 대한 설정 */}
          {post.imageUrl && post.imageUrl.length > 0 && (
            <Carousel images={post.imageUrl}></Carousel>
          )}
        </div>
        <div className="flex justify-between my-[5px]">
          <div className="flex">
            <div>
              {data?.isPressLike ? (
                <div onClick={handleLike}>
                  <FaHeart color={'red'} size={25} />
                </div>
              ) : (
                <div onClick={handleLike}>
                  <FaRegHeart size={25} />
                </div>
              )}
            </div>
            <MdChatBubbleOutline size={25} />
            {/* <IoIosSend size={25} /> */}
          </div>
          <div>{data?.likeCount}명이 좋아합니다</div>
        </div>
        <div className="flex text-[20px] font-[600] mt-[5px]">{post.title}</div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          {post.content}
        </div>
        <div className="text-subtitle text-gray">
          댓글 {post.commentCount}개 보기
        </div>

        <div className="flex flex-wrap"></div>
      </div>
    </div>
  );
}

export default CommunityPost;
