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
    // {
    //   "receiverId" : 1, // 메세지를 받을 사람의 ID = 입찰자의 ID
    //   "exchangePostId" : 2, // 교환 게시글의 ID
    //   "bidId" : 2 // 입찰의 ID
    // }
    const body = {
      receiverId: 4,
      exchangePostId: 6,
      bidId: 4,
    };
    const returnData = await postCreateRoom(body);
    console.log(returnData);
    router.push(`/chatting/${returnData.chatRoomId}`);
  }

  //   <>
  //   <div className="w-[60px] flex justify-center">
  //     <MdDeleteForever size={40} />
  //   </div>
  //   <div className="w-[60px] flex justify-center">
  //     <MdEditNote size={40} />
  //   </div>
  // </>
  return (
    <div>
      <Header title={postContent.title} backNav>
        {postContent.postOwner ? (
          <>
            <div className="w-[60px] flex justify-center">
              <MdDeleteForever size={40} />
            </div>

            {/* <Link
              href={`/postingexchange/edit?post=${params.id}&selectedItem=${postContent.item.itemId}`}
            > */}
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
            <div className="m-[10px] flex justify-between font-[600]">
              <div>입찰목록</div>
              <div>거절목록</div>
            </div>
          </div>
          <div>
            <div>
              {postContent.bidList.map((e: any, i: any) => (
                <div key={i} className="relative border-gray border-b-[0.5px]">
                  <div className="flex m-[5px]">
                    <div className="relative w-[80px] h-[80px] overflow-hidden">
                      <Image
                        src={e.imageUrl}
                        alt="Item image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="flex-1 mx-[5px]">
                      <div className="font-[600]">{e.items}</div>
                      <div className="text-gray text-[12px]">{e.name}</div>
                    </div>
                    <div className="w-[80px] h-[80px] relative flex">
                      <div
                        onClick={handleChatting}
                        className="flex-1 flex justify-center flex-col bg-base rounded-[5px] justify-center"
                      >
                        <div className="text-center">채 팅</div>
                      </div>
                      <div className="mx-[5px]">X</div>
                    </div>
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
            <div className={` bg-white border-gray`}>
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
              <Link href={`/bid/${e.bidId}`}>
                <BidItem bid={e} key={i} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
