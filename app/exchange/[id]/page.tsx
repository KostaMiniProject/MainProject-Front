'use client';
import { useEffect, useState } from 'react';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import BidItem from '@/components/bid/BidItem';
import Header from '@/components/Header';
import { MdDeleteForever, MdEditNote, MdReport } from 'react-icons/md';
import { getExchangePost } from '@/api/ExchangePostApi';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/api/Cookie';
import Image from 'next/image';
import Link from 'next/link';
import { postCreateRoom } from '@/api/ChattingApi';
import BottomFixed from '@/components/BottomFixed';

interface bidContent {
  id: number;
  name: string;
  imageUrl: string;
  items: string;
}
interface PostContent {
  title: string;
  item: {
    itemId: number;
    description: string;
    title: string;
    imageUrls: string[];
  };
  postOwner: boolean;
  profile: {
    id: number;
    name: string;
    address: string;
    imageUrl: string;
    rating: number;
  };
  preferItems: string;
  address: string;
  content: string;
  bidList: bidContent[];
  // bidlist
  // {
  //   id: number;
  //   name: string;
  //   imageUrl: string;
  //   items: string;
  // }
}

function Page({ params }: { params: any }) {
  const [postContent, setPostContent] = useState<PostContent | null>(null);
  const [returnData, setReturnData] = useState();
  const router = useRouter();
  const userId: string | undefined = getCookie('userId');

  // async function postCreateChat(bidId:number) {
  //   const body = {
  //     bidId: bidId
  //   }
  //   postCreateRoom(body);
  // }
  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const data = await getExchangePost(params.id);
        console.log(data);
        setPostContent(data);
      } catch (error) {
        console.error('Error fetching exchange post data:', error);
      }
    };

    fetchPostContent();
  }, [params.id, userId]);

  if (!postContent) {
    // 데이터 로딩 중에 표시할 내용
    return <div>Loading...</div>;
  }
  async function handleChatting() {
    const body = {
      bidId: params.id,
    };
    try {
      const returnData = await postCreateRoom(body);
      console.log(returnData);
      router.push(`/chatting/${returnData.chatRoomId}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header title={postContent.title} backNav>
        {postContent.postOwner ? (
          <>
            <div className="w-[60px] flex justify-center">
              <MdDeleteForever size={40} />
            </div>

            <Link href={`/exchange/${params.id}/edit`}>
              <MdEditNote size={40} />
            </Link>
          </>
        ) : (
          <div>
            <MdReport size={40} />
          </div>
        )}
      </Header>
      {postContent.postOwner ? (
        <div className="">
          <div className="flex border-gray border-y-[0.5px] border-solid">
            <div className="relative w-[80px] h-[80px] overflow-hidden my-auto mx-[5px]">
              <Image
                src={postContent.item.imageUrls[0]}
                alt="Item image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div className="font-[600]">{postContent.item.title}</div>
              <div className="text-[12px] text-gray">{postContent.address}</div>
            </div>
          </div>
          <div className="border-gray border-b-[0.5px] border-solid">
            <div className="my-[10px] flex justify-between font-[600]">
              <div>입찰목록</div>
              {/* <div>거절목록</div> */}
            </div>
          </div>
          <div>
            <div>
              {postContent.bidList.map((e: any, i: any) => (
                <div
                  key={i}
                  className="relative justify-between flex items-center  border-solid border-b-[0.5px] border-gray"
                >
                  <Link href={`/bid/${e.bidId}`}>
                    <BidItem bid={e} />
                  </Link>
                  <div className="absolute right-0" onClick={() => {}}>
                    {/* <Link href={`/chatting/${e.bidId}`}> */}
                    <Button
                      text="대화하기"
                      fontSize={16}
                      height={5}
                      rounded="soft"
                      onClick={handleChatting}
                    />
                    {/* </Link> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 본문 */}
          {/* 캐러셀 섹션 */}
          <div className="w-[100%] h-[auto]">
            <Carousel images={postContent.item.imageUrls} />
          </div>
          {/* 프로필 섹션 */}
          <Profile profile={postContent.profile} />
          {/* 교환 게시글 본문 */}
          <div className="flex flex-col">
            {/* 글 상세내용 */}
            <div className={` bg-white border-gray border-b-[0.5px]`}>
              <div>
                <div className="text-header font-[600]">
                  물건 이름 : {postContent.item.title}
                </div>
                <div className="text-subtitle">
                  거래 장소 : {postContent.address}
                </div>
              </div>
              <div className="text-subtitle my-[5px]">
                <div>원하는 물건 : {postContent.preferItems}</div>
                <div>물건 상세 : {postContent.content}</div>
              </div>
            </div>
            {/* 버튼 */}
          </div>
          <div className="">
            {/* 입찰 리스트 출력 */}
            {postContent.bidList.map((e: any, i: any) => (
              <div
                key={i}
                className=" border-solid border-b-[0.5px] border-gray"
              >
                <Link href={`/bid/${e.bidId}`}>
                  <BidItem bid={e} />
                </Link>
              </div>
            ))}
          </div>
          <BottomFixed>
            <div className="flex justify-end m-[10px]">
              <Link href={`/biding?postId=${params.id}`}>
                <Button
                  text="입찰 하기"
                  height={10}
                  fontSize={14}
                  rounded="soft"
                />
              </Link>
            </div>
          </BottomFixed>
        </>
      )}
    </div>
  );
}

export default Page;
