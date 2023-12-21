'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import React from 'react';
import { FaExchangeAlt } from "react-icons/fa";
import Image from 'next/image';
import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter();

    function handleReview() {
        router.push("/review");
      }

    return (
        <div className="mx-default">
            <Header title="교환 내역 확인" />
            <div className="">
                <div className="w-full p-[10px] border-solid border-[0.5px] border-gray rounded-[5px] my-[5px]">
                    <div className="flex justify-between ml-[15px] mr-[15px] items-center">
                        <div className="text-gray text-subtitle">
                            2023-12-21
                        </div>
                        <div className="w-[30%]">
                            <Button text="후기 작성하기" onClick={handleReview} fontSize={12} height={8} rounded="soft" btnStyle='disable' />
                        </div>
                    </div>
                    <div className="flex m-[15px] border-b-[0.5px] border-gray"></div>
                    <div className="flex justify-between ml-[70px] mr-[70px] items-center">
                        <div className="relative w-[80px] h-[80px] ml-[15px] mr-[15px] border-gray border-solid border-[1px] rounded-[10px]">
                            <Image
                                src=''
                                alt="Item image"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <FaExchangeAlt size="30"></FaExchangeAlt>
                        <div className="relative w-[80px] h-[80px] ml-[15px] mr-[15px] border-gray border-solid border-[1px] rounded-[10px]">
                            <Image
                                src=''
                                alt="Item image"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
