'use client';
import React from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
import Button from '@/components/Button';

function Page() {
    return (
        <div className="relative">
            <div className="mx-default">
                <Header title="차단 목록">
                </Header>
                <div className=" flex py-[5px] border-b-[0.5px] border-gray">
                    <div className="relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px] rounded-[8px]">
                        <Image
                            src=''
                            alt="Item image"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative flex-1 px-[5px] flex-col flex justify-between whitespace-nowrap text-ellipsis overflow-hidden">
                        <div>
                            <div className="font-[800] text-title leading-none text-ellipsis overflow-hidden">
                                닉네임
                            </div>
                            <div className="text-gray text-subtitle leading-none">
                                차단한 날짜
                            </div>
                        </div>
                    </div>
                    <div className="flex relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px] rounded-[8px] items-center">
                        <Button text="차단 해제" fontSize={12} height={8} rounded="soft" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
