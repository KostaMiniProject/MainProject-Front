'use client';
import Header from '@/components/Header';
import Carousel from '@/components/carousel/Carousel';
import React, { useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {
  MdClose,
  MdDeleteForever,
  MdEditNote,
  MdOutlineReply,
  MdOutlineSend,
} from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa';
import Profile from '@/components/Profile';
import {
  deleteCommunityComment,
  deleteCommunityPost,
  getCommunityPostDetail,
  postCommunityPostComment,
  putCommunityPostLike,
} from '@/apis/CommunityApi';
import InputBox from '@/components/InputBox';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

function Comment({
  comment,
  setCommentId,
  parentId,
  handleShowDeleteCommentModal,
}: {
  comment: any;
  setCommentId: any;
  parentId?: number;
  handleShowDeleteCommentModal: any;
}) {
  return (
    <div key={comment.commentId} className="my-[10px] ">
      <div className="flex mb-[5px] w-full border-b-[0.5px] border-gray">
        {/* {comment.parent_id === null ? <></> : <div className="w-[40px]"></div>} */}
        <div className="w-[25px] h-[25px] flex items-center justify-center overflow-hidden rounded-[50%] mr-4">
          {/* <div className="w-[25px] h-[25px] bg-gray rounded-[50%]"> */}
          <Image
            src={comment.profile.imageUrl}
            alt="프로필사진"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            sizes="width: 100%, height: 100%"
            width={60}
            height={60}
            // className="w-[30px] h-[30px] rounded-[50%] my-auto"
          />
        </div>
        <div className=" flex-1">
          <div className="flex items-center text-gray mr-[10px]">
            {comment.profile.name} <FaAngleRight size={15} />
          </div>
          <div className="text-gray mr-[10px] text-subtitle">
            {comment.created_at}
          </div>
          <div className="flex justify-between">
            <div className="">{comment.content}</div>
            <div className="flex">
              <div
                className="m-[5px]"
                onClick={() => {
                  setCommentId({
                    // commentId: comment.commentId,
                    commentId: parentId ? parentId : comment.commentId,
                    profile: comment.profile,
                  });
                }}
              >
                <MdOutlineReply size={20} />
              </div>
              {comment.isOwner && (
                <div
                  className="m-[5px]"
                  onClick={() => {
                    handleShowDeleteCommentModal(comment.commentId);
                  }}
                >
                  <MdClose size={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {comment.children && comment.children.length > 0 && (
        <div className="pl-[40px] ">
          {comment.children?.map((reply: any, index: number) => (
            <Comment
              key={index}
              comment={reply}
              setCommentId={setCommentId}
              // setCommentId={setCommentId}
              parentId={comment.commentId}
              handleShowDeleteCommentModal={handleShowDeleteCommentModal}
            />
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
    isOwner: boolean;
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
const initComment = {
  commentId: -1,
  profile: {
    userId: -1,
    name: null,
    imageUrl: null,
  },
};
function page({ params }: { params: any }) {
  const [post, setPost] = useState<postType>();
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [selectDeleteCommentId, setSelectDeleteCommentId] = useState(-1);
  const [selectComment, setSelectComment] = useState(initComment);
  const inputBox: any = useRef(null);
  const router = useRouter();

  const fetchPost = async () => {
    try {
      const data = await getCommunityPostDetail(params.id);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
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
  };
  const handleResetReplyOfComment = () => {
    setSelectComment(initComment);
  };

  const handleDeletePost = async () => {
    try {
      deleteCommunityPost(params.id);
      alert('글이 삭제되었습니다.');
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      deleteCommunityComment(selectDeleteCommentId);
      alert('댓글이 삭제되었습니다.');
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostComents = async () => {
    let body = null;
    if (selectComment.commentId >= 0) {
      let content = comment;
      if (selectComment.commentId >= 0) {
        content = '@' + selectComment.profile.name + ' ' + content;
      }
      body = {
        content: content,
        parentId: selectComment.commentId,
      };
    } else {
      body = {
        content: comment,
      };
    }
    try {
      const res = await postCommunityPostComment(params.id, body);
      fetchPost();
      if (inputBox.current) {
        inputBox.current.value = '';
      }
      setSelectComment(initComment);
    } catch (error) {
      console.log(error);
    }
  };

  //모달 핸들
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePostComplete = async () => {
    setShowModal(false);
    handleDeletePost();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  //댓글 삭제 모달 핸들
  const handleShowDeleteCommentModal = (commentId: number) => {
    setSelectDeleteCommentId(commentId);
    setShowDeleteCommentModal(true);
  };

  const handleDeleteCommentComplete = async () => {
    setShowDeleteCommentModal(false);
    handleDeleteComment();
  };

  const handleDeleteCommentCloseModal = () => {
    setShowDeleteCommentModal(false);
  };
  return (
    <div className="mx-default">
      <Header backNav title={post?.title}>
        {post?.postOwner && (
          <div className="cursor-pointer" onClick={handleShowModal}>
            <Link href={`/exchange/${params.id}/edit`}>
              <MdEditNote size={40} />
            </Link>
            <MdDeleteForever size={40} />
          </div>
        )}
      </Header>
      {showModal && (
        <Modal setState={handleCloseModal}>
          <div className="my-[5px]">글을 삭제 하시겠습니까?</div>
          <div className="flex place-content-between">
            <Button
              text="삭제"
              onClick={handlePostComplete}
              height={5}
              rounded="soft"
            />
            <Button
              text="취소"
              onClick={handleCloseModal}
              height={5}
              rounded="soft"
            />
          </div>
        </Modal>
      )}
      {showDeleteCommentModal && (
        <Modal setState={handleDeleteCommentCloseModal}>
          <div className="my-[5px]">댓글을 삭제 하시겠습니까?</div>
          <div className="flex place-content-between">
            <Button
              text="삭제"
              onClick={handleDeleteCommentComplete}
              height={5}
              rounded="soft"
            />
            <Button
              text="취소"
              onClick={handleDeleteCommentCloseModal}
              height={5}
              rounded="soft"
            />
          </div>
        </Modal>
      )}
      <div className="w-full p-[10px] flex border-solid border-[0.5px] border-gray rounded-[10px] my-[5px]">
        <div></div>
        <div className="w-full ">
          {post && (
            <Profile
              profile={{
                ...post.user,
                imageUrl: post.user.profileImage,
                userId: post.user.userId,
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
              <Comment
                key={index}
                comment={comment}
                setCommentId={setSelectComment}
                handleShowDeleteCommentModal={handleShowDeleteCommentModal}
              />
            ))}
        </div>
        <div>
          {selectComment.commentId >= 0 && (
            <div className="flex justify-between">
              <div>{selectComment.profile.name} 에게 답글 다는중</div>
              <div onClick={handleResetReplyOfComment}>X</div>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex-1">
              <InputBox ref={inputBox} onChange={setComment} />
            </div>
            <div className="items-center text-center my-auto ">
              <div
                className="m-[5px] cursor-pointer"
                onClick={handlePostComents}
              >
                <MdOutlineSend size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
