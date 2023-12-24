'use client';
import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { MdArrowBack, MdClose, MdOutlineSearch } from 'react-icons/md';

function page() {
  const [keyWord, setKeyWord] = useState<string>('');

  const [recentSearches, setRecentSearches] = useState<string[]>([]); // 최근 검색어 상태

  const route = useRouter();

  useEffect(() => {
    const searches = localStorage.getItem('recentSearches');
    if (searches) {
      setRecentSearches(JSON.parse(searches));
    }
  }, []);

  // 최근 검색어를 로컬 스토리지에 저장하는 함수
  const saveSearchTerm = (term: string) => {
    const updatedSearches = [...recentSearches, term];
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    // setRecentSearches(updatedSearches);
  };

  const deleteSearchTerm = (index: number) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  const category = [
    '패션의류잡화',
    '음반DVD',
    '생활용품',
    '도서',
    '출산유아동',
    '완구취미',
    '뷰티',
    '가전디지털',
    '주방용품',
    '식품',
    '반려애완용품',
    '가구홈데코',
    '자동차용품',
    '스포츠레저',
    '문구오피스',
  ];
  // InputBox에서의 입력값 변경 처리
  const handleInputChange = (value: string) => {
    setKeyWord(value);
  };

  const handleSearchClick = async () => {
    saveSearchTerm(keyWord);
    route.push(`/search/result?keyword=${keyWord}`);
  };

  return (
    <div>
      <div className="h-[60px] flex items-center">
        <div onClick={route.back}>
          <MdArrowBack size={60} />
        </div>
        <InputBox onChange={handleInputChange} message="검색어 입력" />
        <div
          onClick={() => {
            console.log(keyWord);
          }}
        >
          <div onClick={handleSearchClick}>
            <MdOutlineSearch size={40} />
          </div>
        </div>
      </div>
      <div className="text-[16px] font-[600] border-t-[0.5px] border-gray p-[10px]">
        최근 검색어
      </div>
      <div className="flex flex-wrap">
        {recentSearches.map((searchTerm, index) => (
          <div className="m-[5px] flex items-center" key={index}>
            <Button text={searchTerm} fontSize={16} height={8} />
            <MdClose
              size={20}
              className="cursor-pointer ml-2"
              onClick={(e: any) => {
                e.stopPropagation(); // 이벤트 전파 중단
                deleteSearchTerm(index);
              }}
            />
          </div>
        ))}
      </div>
      <div className="text-[16px] font-[600] border-t-[0.5px] border-gray p-[10px] mt-[60px]">
        카테고리
      </div>
      <div className="grid grid-cols-4">
        {/* grid grid-cols-4 한줄에 4개씩 출력 하기 위하여 grid 추가 */}
        {category.map((e: any, i: any) => {
          return (
            <div className="m-[5px]" key={i}>
              <Button text={e} fontSize={15} height={8} />
            </div>
          );
        })}
      </div>
      {/* <div className="text-[16px] font-[600] border-t-[0.5px] border-gray p-[10px] mt-[60px]">
        찜 목록
      </div>
      {wishList.map((e: any, i: any) => (
        <div className="flex my-[5px]" key={i}>
          <div className="relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px] rounded-[8px] border-[0.5px] border-gray p-[10px]">
            <Image
              src={e.imageUrl}
              alt="Item image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="relative flex-1 px-[5px] flex-col flex justify-between whitespace-nowrap text-ellipsis overflow-hidden border-b-[0.5px] border-gray p-[10px]">
            <div>
              <div className="font-[800] text-title leading-none text-ellipsis overflow-hidden">
                {e}
              </div>
              <div className="text-gray text-subtitle leading-none">{e}</div>
            </div>
            <div className="flex justify-between absolute bottom-0">
              <div className="text-gray mr-[10px] text-subtitle">{e}</div>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default page;
