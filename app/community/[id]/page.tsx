'use client';
import Header from '@/components/Header';
import Carousel from '@/components/carousel/Carousel';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdDeleteForever, MdOutlineSend } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa';
import Profile from '@/components/Profile';
import {
  getCommunityPostDetail,
  postCommunityPostComment,
  putCommunityPostLike,
} from '@/apis/CommunityApi';
import InputBox from '@/components/InputBox';

function Comment({ comment }: { comment: any }) {
  const [replyOfComment, setReplyOfComment] = useState();
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
          {comment.children.map((reply: any) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
interface postType {
  commentCount: number;
  communityPostId: number;
  comments?: {
    commentId: number;
    content: string;
    profile: {
      userId: number;
      name: string;
      imageUrl: string;
    };
    children: [];
  }[];
  communityPostStatus: string;
  content: string;
  date: string;
  imageUrl: [];
  isPressLike: boolean;
  likeCount: number;
  postOwner: boolean;
  title: string;
  user: {
    address: string;
    email: string;
    name: string;
    phone: string;
    profileImage: string;
    rating: number;
    userId: number;
  };
}
function page({ params }: { params: any }) {
  const [post, setPost] = useState<postType>();
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getCommunityPostDetail(params.id);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);
  const handleLike = async () => {
    try {
      if (post) {
        await putCommunityPostLike(post.communityPostId);
        setPost((prev: any) => ({
          ...prev,
          isPressLike: !prev.isPressLike,
          likeCount: prev.isPressLike ? prev.likeCount - 1 : prev.likeCount + 1,
        }));
      }
    } catch (error) {
      alert('로그인이 필요합니다');
      console.log(error);
    }
    // console.log(data?.isPressLike);
  };
  const handleDeletePost = () => {
    alert('delete post');
  };
  const handlePostComents = async () => {
    const body = {
      content: comment,
    };
    try {
      const res = await postCommunityPostComment(params.id, body);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Header backNav title={post?.title}>
        {post?.postOwner && (
          <div className="cursor-pointer" onClick={handleDeletePost}>
            <MdDeleteForever size={40} />
          </div>
        )}
      </Header>
      <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[10px] my-[5px]">
        <div></div>
        <div className="w-full ">
          {/* <div className="flex mb-[10px]">
            <div className="w-[40px] h-[40px] bg-black rounded-[50%]"></div>
            <div className="flex justify-center items-center text-gray ml-[10px]">
              {post.user.name}
              <FaAngleRight size={15} />
            </div>
          </div> */}
          {post && (
            <Profile
              profile={{
                ...post.user,
                imageUrl: post.user.profileImage,
                id: post.user.userId,
              }}
            />
          )}
          <div className="w-[100%] h-[auto]">
            {/* 캐러셀에 대한 설정 */}
            {post && post.imageUrl.length > 0 && (
              <Carousel images={post.imageUrl}></Carousel>
            )}
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
            {post?.title}
          </div>
          <div className="text-gray mr-[10px] text-subtitle">{post?.date}</div>

          <div className="whitespace-nowrap text-ellipsis overflow-hidden mb-[5px]">
            {post?.content}
          </div>
        </div>
      </div>
      <div className="mx-[15px]">
        <div className="flex text-[20px] font-[600] mt-[5px] underline">
          댓글
        </div>
        <div>
          {post &&
            post.comments &&
            post.comments.length > 0 &&
            post.comments.map((comment: any, index: number) => (
              <Comment key={index} comment={comment} />
            ))}
        </div>
        <div className="flex">
          <div className="flex-1">
            <InputBox onChange={setComment} />
          </div>
          <div className="items-center text-center my-auto ">
            <div className="m-[5px] cursor-pointer" onClick={handlePostComents}>
              <MdOutlineSend size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
