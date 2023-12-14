'use client';
import { getItemDetailById } from '@/api/ItemApi';
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
              id: item.user.userId,
              name: item.user.name,
              address: item.user.address,
              imageUrl: item.user.profileImage,
              rating: 33,
            }}
          />
          <div className="mx-[15px]">
            <div className="py-[5px] border-solid border-b-[0.5px] ">
              <div className="text-[25px] font-[600]">{item.title}</div>
              <div className="flex">
                {/* <Button text={detail.category} btnStyle="tag" height={5} /> */}
              </div>
            </div>
            <div className="min-h-[300px] my-[5px] bg-softbase rounded-[5px] ">
              <div className="py-[5px] font-[600]">{item.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
