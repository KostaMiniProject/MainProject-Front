'use client';
import { useEffect, useState } from 'react';
import { getProfile } from '@/api/ProfileApi';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import BidItem from '@/components/bid/BidItem';
import { getBidList } from '@/api/BidApi';
import Header from '@/components/Header';
import { MdDeleteForever, MdEditNote, MdReport } from 'react-icons/md';
import { getExchangePost } from '@/api/ExchangePostApi';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/api/Cookie';

interface PostContent {
  title: string;
  post_owner: string;
  item: {
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
  prefer_items: string;
  address: string;
  content: string;
  bidList: any[];
}

function Page({ params }: { params: any }) {
  const [postContent, setPostContent] = useState<PostContent | null>(null);
  // const [isOwner, setIsOwner] = useState<boolean>(false);
  const router = useRouter();
  const userId: string | undefined = getCookie('userId');

  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const data = await getExchangePost(params.id);
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
        <div>
          <MdReport size={40} />
        </div>
      </Header>
      {postContent.postOwner ? (
        <div>
          <div className="flex">
            <div>사진</div>
            <div>
              <div>물건 이름</div>
              <div>거래 장소</div>
            </div>
          </div>
          <div> 입찰 목록 거절내역</div>
          <div>아이템</div>
          <div>아이템</div>
          <div>아이템</div>
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
          <div className="flex flex-col m-[15px] bg-softbase p-[5px] rounded-[5px]">
            {/* 글 상세내용 */}
            <div className={` p-[10px] rounded-[5px] bg-white border-gray`}>
              <div className="text-[18px] font-[600] border-gray border-solid border-b-[0.5px]">
                물건 이름 : {postContent.item.title}
              </div>
              <div className="text-[18px] font-[600] ">
                원하는 물건 : {postContent.prefer_items}
              </div>
              <div>거래 장소 : {postContent.address}</div>
              <div>물건 상세 : {postContent.content}</div>
            </div>
            {/* 버튼 */}
            <div className="flex">
              <div className={` flex-1 text-center `}>
                <Button
                  text="입찰 목록"
                  fontSize={20}
                  height={5}
                  rounded="soft"
                ></Button>
              </div>
              <div
                className={` flex-1 text-center `}
                onClick={() => {
                  router.push('/biding');
                }}
              >
                <Button
                  text="입찰 하기"
                  fontSize={20}
                  height={5}
                  rounded="soft"
                ></Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 m-[15px]">
            {/* 입찰 리스트 출력 */}
            {postContent.bidList.map((e: any, i: any) => (
              <BidItem bid={e} key={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
