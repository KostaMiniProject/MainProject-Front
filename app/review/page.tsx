"use client";
import Header from '@/components/Header';
import React, { useState } from 'react';
import Button from '@/components/Button';
import TextAreaBox from '@/components/TextAreaBox';
import { FaRegFaceGrinBeam, FaRegFaceSmile, FaRegFaceFrown } from "react-icons/fa6";


function ReviewContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 border-solid border-[2px] border-base rounded-[10px] m-[10px] bg-white">
            <div className="flex flex-col items-center justify-center h-full p-[10px]">
                {children}
            </div>
        </div>
    );
}

function Page() {
    const [content, setContent] = useState<String>('');

    return (
        <div className='mx-default'>
            <Header title="리뷰 작성" />
            <div className="">
                <div className="my-[5px] mb-[10px]">
                    <div className="text-header font-[600] flex"><span className='underline text-gray'>사용자1</span>님에 대해 알려주세요!</div>
                </div>
                <div className="flex items-center text-center mb-[25px]">
                    <ReviewContainer>
                        <FaRegFaceGrinBeam size={'2rm'} color={'#e00685'} />
                        <div className="text-[15px]">완전 추천해요!</div>
                    </ReviewContainer>
                    <ReviewContainer>
                        <FaRegFaceSmile size={'2rm'} color={'#e00685'} />
                        <div className="text-[15px]">괜찮아요.</div>
                    </ReviewContainer>
                    <ReviewContainer>
                        <FaRegFaceFrown size={'2rm'} color={'#e00685'} />
                        <div className="text-[15px]">추천하지 않아요.</div>
                    </ReviewContainer>
                </div>
                <div className="my-[5px]">
                    <div className="text-header font-[600] flex">리뷰 작성하기(0/500)</div>
                    <TextAreaBox onChange={setContent}></TextAreaBox>
                </div>
                <div className="text-center my-[15px] cursor-pointer">
                    <Button
                        text="평가 보내기"
                        fontSize={20}
                        height={8}
                        rounded="soft"
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;