'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getMyHistory } from '@/apis/ProfileApi';
import Link from 'next/link';

interface bidderItemType {
  description: string;
  imageUrl: string[];
  title: string;
}
interface posterItemType {
  description: string;
  imageUrl: string;
  itemId: number;
  title: string;
}
interface historyType {
  bidderAddress: string;
  bidderItem: bidderItemType[];
  bidderName: string;
  bidderProfileImage: string;
  reviewedUserId: number;
  createdAt: string;
  exchangePostId: number;
  isWriteReview: boolean;
  posterAddress: string;
  posterItem: posterItemType[];
  posterName: string;
  posterProfileImage: string;
}

function Page() {
  const [history, setHistory] = useState<historyType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyHistory(0);
        setHistory(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-default">
      <Header backNav title="교환 내역 확인" />
      {history &&
        history.map((e: historyType, i: any) => {
          return (
            <div className="mx-default" key={i}>
              <div className="w-full p-[10px] border-solid border-[0.5px] border-gray rounded-[5px] my-[5px]">
                <div className="flex justify-between items-center">
                  <div className="text-gray text-subtitle">{e.createdAt}</div>
                  <div className="w-[30%]">
                    {e.isWriteReview ? (
                      <Button
                        text="후기 작성하기"
                        fontSize={12}
                        height={8}
                        rounded="soft"
                        btnStyle="disable"
                      />
                    ) : (
                      <Link
                        href={`/review?exchange=${e.exchangePostId}&userId=${e.reviewedUserId}`}
                      >
                        <Button
                          text="후기 작성하기"
                          fontSize={12}
                          height={8}
                          rounded="soft"
                          btnStyle="active"
                        />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex m-[15px] border-b-[0.5px] border-gray"></div>
                <div className="flex justify-between ml-[70px] mr-[70px] items-center">
                  <div className="relative w-[80px] h-[80px] border-gray border-solid border-[1px] rounded-[10px]">
                    <Image
                      src={e.posterItem[0].imageUrl}
                      alt="Item image"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <FaExchangeAlt size="30"></FaExchangeAlt>
                  {e.bidderItem.map((item: bidderItemType, index: any) => {
                    return (
                      <div
                        key={index}
                        className="relative w-[80px] h-[80px] border-gray border-solid border-[1px] rounded-[10px]"
                      >
                        <Image
                          src={item.imageUrl[index]}
                          alt="Item image"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Page;
