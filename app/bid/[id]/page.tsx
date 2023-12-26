'use client';
import Header from '@/components/Header';
import Profile from '@/components/Profile';
import React, { useEffect, useState } from 'react';
import Item from '@/components/item/Item';
import { MdDeleteForever, MdOutlineReportGmailerrorred } from 'react-icons/md';
import { deleteBid, getBidItemList } from '@/apis/BidApi';
import Link from 'next/link';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
interface ItemList {
  isOwner: boolean;
  profile: {
    userId: number;
    name: string;
    address: string;
    imageUrl: string;
    rating: number;
  };
  items: {
    id: number;
    title: string;
    description: string;
    imageUrls: string;
    createdAt: string;
  }[];
}

function page({ params }: { params: any }) {
  const [showModal, setShowModal] = useState(false);
  const [itemList, setItemList] = useState<ItemList>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedItemList = await getBidItemList(params.id);
        setItemList(fetchedItemList);
      } catch (error) {
        console.error('Error fetching item list:', error);
      }
    }
    fetchData();
  }, [params.id]);

  const deleteComplete = async () => {
    try {
      await deleteBid(params.id);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePostComplete = async () => {
    setShowModal(false);
    deleteComplete();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <Header title="입찰 아이템 리스트" backNav>
        <div className="w-[60px] flex justify-center">
          {itemList?.isOwner ? (
            <div onClick={handleShowModal} className="cursor-pointer">
              <MdDeleteForever size={40} />
            </div>
          ) : (
            <MdOutlineReportGmailerrorred size={40} />
          )}
        </div>
      </Header>
      {showModal && (
        <Modal setState={handleCloseModal}>
          <div className="text-subtitle w-[250px]">
            <div className="my-[5px] text-header font-[600]">
              입찰을 취소 하시겠습니까?
            </div>
            <div className="flex place-content-between p-[5px]">
              <Button
                text="입찰 취소"
                fontSize={16}
                onClick={handlePostComplete}
                height={6}
                rounded="soft"
              />
              <Button
                text="아니오"
                fontSize={16}
                onClick={handleCloseModal}
                height={6}
                rounded="soft"
              />
            </div>
          </div>
        </Modal>
      )}
      <div className="mx-default">
        {/* 프로필 */}
        {itemList && <Profile profile={itemList.profile} />}
        {/* 물건 리스트 */}
        <div className="">
          {itemList &&
            itemList.items.map((e: any, i: any) => {
              return (
                <Link href={`/itemdetail/${e.itemId}`} key={i}>
                  <Item item={e} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default page;
