'use client';
import { getItemDetailById } from '@/apis/ItemApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface itemType {
  createAt: string;
  description: string;
  images: [];
  isBiding: string;
  itemId: number;
  itemStatus: string;
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

function Page({ params }: { params: any }) {
  const [item, setItem] = useState<itemType>();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemDetailById(params.id);
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error('Error fetching exchange post data:', error);
      }
    };
    fetchItem();
  }, []);

  return (
    <div>
      <Header title="아이템 상세" backNav>
        {/* 헤더 아이콘 */}
      </Header>
      {item && (
        <div>
          <div className="">
            <Carousel images={item.images} />
          </div>
          <Profile
            profile={{
              userId: item.user.userId,
              name: item.user.name,
              address: item.user.address,
              imageUrl: item.user.profileImage,
              rating: item.user.rating,
            }}
          />
          <div className="">
            <div className="py-[5px] border-solid border-b-[0.5px] border-gray">
              <div className="text-header font-[600]">{item.title}</div>
              <div className="flex">
                {/* <Button text={detail.category} btnStyle="tag" height={5} /> */}
              </div>
            </div>
            <div className="min-h-[200px] my-[5px]  rounded-[5px] ">
              <div className="py-[5px] text-title text-gray">
                <div>{item.description}</div>
                <div>{item.createAt}</div>
                <div>{item.itemStatus}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
