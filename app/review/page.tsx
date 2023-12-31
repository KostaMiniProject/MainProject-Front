'use client';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import {
  FaRegFaceGrinBeam,
  FaRegFaceSmile,
  FaRegFaceFrown,
} from 'react-icons/fa6';
import useInputLength from '@/components/UseInputLength';
import { useRouter, useSearchParams } from 'next/navigation';
import { postReview } from '@/apis/ReviewApi';

const MAX_LENGTH = 500;

function ReviewContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 border-solid border-[2px] border-base rounded-[10px] m-[5px] bg-white">
      <div className="flex flex-col items-center justify-center p-[5px]">
        {children}
      </div>
    </div>
  );
}
//reviewedUserName api 추가
function Page() {
  const [content, setContent] = useState<String>('');
  const [inputCount, handleInput] = useInputLength(MAX_LENGTH);
  const [selectRating, setSelectRating] = useState(0);
  const [exchangeId, setExchangeId] = useState(-1);
  const [reviewedUserId, setReviewedUserId] = useState(-1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const borderPx = '3px';
  const iconColor = '#000';

  useEffect(() => {
    const exchangePostId = searchParams.get('exchange') ?? '';
    setExchangeId(parseInt(exchangePostId));
    const userId = searchParams.get('userId') ?? '';
    setReviewedUserId(parseInt(userId));
  }, []);

  const handlePostReview = async () => {
    if (selectRating == 0) {
      alert('점수를 선택 해 주세요');
      return;
    }
    const body = {
      reviewedUserId: reviewedUserId,
      rating: selectRating,
      review: content,
    };
    try {
      await postReview(exchangeId, body);
      router.push('/profile/exchangeHistory');
    } catch (error) {
      console.log(error);
    }
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInput(e);
    setContent(e.target.value);
  };

  return (
    <div className="mx-default">
      <Header title="리뷰 작성" />
      <div className="">
        <div className="my-[5px] mb-[10px]">
          <div className="text-header font-[600] flex">
            <span className="underline text-gray">
              {searchParams.get('userName')}
            </span>
            님에 대해 알려주세요!
          </div>
        </div>
        <div className="flex items-center text-center justify-between">
          <div
            className="flex-1"
            style={
              selectRating === 5
                ? { borderWidth: borderPx }
                : { margin: borderPx }
            }
            onClick={() => {
              setSelectRating(5);
            }}
          >
            <ReviewContainer>
              <div className="p-[5px] w-full h-full">
                <FaRegFaceGrinBeam size={'100%'} color={iconColor} />
              </div>
              <div className="text-title">추천해요</div>
            </ReviewContainer>
          </div>
          <div
            className="flex-1"
            style={
              selectRating === 3
                ? { borderWidth: borderPx }
                : { margin: borderPx }
            }
            onClick={() => {
              setSelectRating(3);
            }}
          >
            <ReviewContainer>
              <div className="p-[5px] w-full h-full">
                <FaRegFaceSmile size={'100%'} color={iconColor} />
              </div>
              <div className="text-title">괜찮아요</div>
            </ReviewContainer>
          </div>
          <div
            className="flex-1"
            style={
              selectRating === 1
                ? { borderWidth: borderPx }
                : { margin: borderPx }
            }
            onClick={() => {
              setSelectRating(1);
            }}
          >
            <ReviewContainer>
              <div className="p-[5px] w-full h-full">
                <FaRegFaceFrown size={'100%'} color={iconColor} />
              </div>
              <div className="text-title">별로예요</div>
            </ReviewContainer>
          </div>
        </div>
        <div className="my-[5px]">
          <div className="text-header font-[600] flex">
            리뷰 작성하기(
            <span>{inputCount.toLocaleString()}</span>
            <span>/{MAX_LENGTH.toLocaleString()}자</span>)
          </div>
          <div className={`border-[0.5px] rounded-[8px]  flex-1 border-gray`}>
            <textarea
              placeholder="입력해 주세요"
              rows={8}
              className="resize-none w-full h-full p-2 outline-none border-transparent bg-transparent text-subtitle"
              maxLength={MAX_LENGTH}
              onChange={handleTextChange}
            ></textarea>
          </div>
        </div>
        <div
          className="text-center my-[15px] cursor-pointer"
          onClick={handlePostReview}
        >
          <Button text="평가 보내기" fontSize={20} height={8} rounded="soft" />
        </div>
      </div>
    </div>
  );
}

export default Page;
