import { getProfile } from '@/api/ProfileApi';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import BidItem from '@/components/bid/BidItem';
import { getBidList } from '@/api/BidApi';
import Header from '@/components/Header';
import { MdDeleteForever, MdEditNote, MdReport } from 'react-icons/md';
import { getExchangePost } from '@/api/ExchangePostApi';
import Button from '@/components/Button';

function Page({ params }: { params: any }) {
  const post_Content = getExchangePost(params.id);
  const borderStyle = 'border-solid border-black border-[1px]';
  return (
    <div>
      <Header title={post_Content.title} backNav>
        {/* 헤더 아이콘 */}
        {post_Content.post_owner ? (
          <>
            <div className="w-[60px] flex justify-center">
              <MdDeleteForever size={40} />
            </div>
            <div className="w-[60px] flex justify-center">
              <MdEditNote size={40} />
            </div>
          </>
        ) : (
          <>
            <div>
              <MdReport size={40} />
            </div>
          </>
        )}
      </Header>
      {/* 본문 */}
      {/* 캐러셀 섹션 */}
      <div className="h-[360px]">
        <Carousel images={post_Content.item.image_url} />
      </div>
      {/* 프로필 섹션 */}
      <Profile profile={post_Content.profile} />
      {/* 교환 게시글 본문 */}
      <div className="flex flex-col m-[15px] bg-softbase p-[5px] rounded-[5px]">
        {/* 글 상세내용 */}
        <div
          className={`${borderStyle} p-[10px] rounded-[5px] bg-white border-gray`}
        >
          <div className="text-[18px] font-[600] border-gray border-solid border-b-[0.5px]">
            물건 이름 : {post_Content.item.title}
          </div>
          <div className="text-[18px] font-[600] ">
            원하는 물건 : {post_Content.prefer_items}
          </div>
          <div>거래 장소 : {post_Content.address}</div>
          <div>물건 상세 : {post_Content.content}</div>
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
          {post_Content.post_owner ? (
            <div className={` flex-1 text-center  `}>
              <Button
                text="거절 내역 보기"
                fontSize={20}
                height={5}
                rounded="soft"
              ></Button>
            </div>
          ) : (
            <div className={` flex-1 text-center `}>
              <Button
                text="입찰 하기"
                fontSize={20}
                height={5}
                rounded="soft"
              ></Button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 m-[15px]">
        {/* 입찰 리스트 출력 */}
        {post_Content.bid_list.map((e: any, i: any) => (
          <BidItem bid={e} postOwner={post_Content.post_owner} />
        ))}
      </div>
    </div>
  );
}

export default Page;
