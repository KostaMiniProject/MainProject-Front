'use client';
import Button from '@/components/Button';
import InputBox from '@/components/InputBox';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getSearchPostList } from '@/apis/ExchangePostApi';

import Image from 'next/image';
import { MdArrowBack, MdOutlineSearch } from 'react-icons/md';

function page() {
  const [keyWord, setKeyWord] = useState<string>('');
  const [postData, setPostData] = useState<any[]>([]); // postData 초기값을 빈 배열로 설정
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 상태
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pageNation, setPageNation] = useState(0);

  const route = useRouter();
  const recentSearches = [
    '갤럭시S22',
    '스타벅스 텀블러',
    '삼성노트북',
    '소니 헤드셋',
  ];
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
  const wishList = ['감자', '고구마', '바나나'];
  // InputBox에서의 입력값 변경 처리
  const handleInputChange = (value: string) => {
    setKeyWord(value);
  };

  const handleSearchClick = async () => {
    route.push(`/search/result?keyword=${keyWord}`);
    // setPageNation(0); // 검색 시작 시 페이지 번호를 0으로 초기화
    // setHasMoreData(true); // 더 많은 데이터가 있음을 가정
    // await fetchPostData(); // 검색 실행
  };

  // const fetchPostData = async () => {
  //   if (!hasMoreData) return;

  //   try {
  // const data = await getSearchPostList(pageNation, keyWord);

  //     if (pageNation === 0) {
  //       setPostData(data); // 첫 페이지의 경우, 기존 데이터를 덮어쓴다
  //     } else {
  //       // 서버에서 받아온 데이터가 배열인 경우에만 병합
  //       if (Array.isArray(data)) {
  //         setPostData(prevData => [...prevData, ...data]); // 추가 데이터를 기존 데이터에 병합
  //       }
  //     }

  //     setPageNation((prev) => prev + 1);

  //     if (!data || data.length < 10) {
  //       setHasMoreData(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching post data:', error);
  //     setHasMoreData(false);
  //   }
  // };

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
        {recentSearches.map((e: any, i: any) => {
          return (
            <div className="m-[5px]" key={i}>
              <Button text={e} fontSize={16} height={8} />
            </div>
          );
        })}
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
      <div className="text-[16px] font-[600] border-t-[0.5px] border-gray p-[10px] mt-[60px]">
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
              {/* 타이틀 */}
              <div className="font-[800] text-title leading-none text-ellipsis overflow-hidden">
                {e}
              </div>
              {/* 주소 */}
              <div className="text-gray text-subtitle leading-none">{e}</div>
            </div>
            {/* 태그 */}
            <div className="flex justify-between absolute bottom-0">
              <div className="text-gray mr-[10px] text-subtitle">{e}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default page;
