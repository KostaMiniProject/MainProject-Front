'use client';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';

import Item from '@/components/item/Item';
import BottomFixed from '@/components/BottomFixed';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { deleteItemById, getItemList, getMyItemList } from '@/apis/ItemApi';
import InputBox from '@/components/InputBox';
import { MdDeleteForever, MdOutlineSearch } from 'react-icons/md';
import Link from 'next/link';
import Modal from '@/components/Modal';

function page() {
  const [itemList, setItemList] = useState([]);
  const route = useRouter();
  const [keyword, setKeyWord] = useState<String>('');
  const [showModal, setShowModal] = useState(false);
  const [selectItem, setSeleteItem] = useState(-1);

  const fetchData = async () => {
    try {
      const data = await getMyItemList();
      setItemList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 비동기로 아이템 목록을 불러오고 상태에 설정
    fetchData();
  }, []);
  // 삭제 버튼 클릭 이벤트 핸들러
  const handleDelete = (itemId: number) => {
    setSeleteItem(itemId);
    setShowModal(true); // 모달을 표시
  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setShowModal(false); // 모달을 숨김
  };
  // 삭제 확인 버튼 눌렀을 때 핸들러
  const handleDeleteItem = async () => {
    try {
      await deleteItemById(selectItem);
      alert('삭제가 완료되었습니다.');
      fetchData();
    } catch (error) {
      console.log(error);
    }
    setShowModal(false); // 모달을 숨김
  };

  return (
    <div className="relative">
      <Header title="내 물건" backNav></Header>
      {/* 검색창 */}
      <div className=" h-[60px] flex items-center border-b-[1px] border-gray">
        <InputBox onChange={setKeyWord} />
        <div
          onClick={() => {
            console.log(keyword);
          }}
        >
          <MdOutlineSearch size={40} />
        </div>
      </div>
      {/* 물건 리스트 */}
      <div className="mx-[15px]">
        {itemList.length > 0 ? (
          itemList.map((e: any, i: any) => {
            return (
              <div className="flex" key={i}>
                <div className="flex-1">
                  <Link href={`/itemdetail/${e.itemId}`} key={i}>
                    <Item item={e} />
                  </Link>
                </div>
                {e.isBiding === 'NOT_BIDING' && (
                  <div
                    className="my-auto cursor-pointer"
                    onClick={() => {
                      handleDelete(e.itemId);
                    }}
                  >
                    <MdDeleteForever size={25} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>등록 된 물건이 없습니다</div>
        )}
      </div>
      {showModal && (
        <Modal setState={handleCloseModal}>
          <div>물건을 삭제하시겠습니까?</div>
          <div className="flex place-content-between">
            <Button
              text="삭제"
              onClick={handleDeleteItem}
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
      {/* 하단 고정 버튼 */}
      <BottomFixed>
        <div className="flex justify-end">
          <Link href={'/additem'}>
            <Button text="+ 물건 등록" height={10} fontSize={16} />
          </Link>
        </div>
      </BottomFixed>
    </div>
  );
}

export default page;
