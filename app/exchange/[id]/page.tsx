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
      <Header title="교환 상세" backNav>
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
        <Carousel images={post_Content.image_url} />
      </div>
      {/* 프로필 섹션 */}
      <Profile profile={post_Content.profile} />
      {/* 교환 게시글 본문 */}
      <div className="flex flex-col m-[15px] bg-softbase p-[5px] rounded-[5px]">
        <div
          className={`${borderStyle} p-[10px] rounded-[5px] bg-white border-gray`}
        >
          {post_Content.content}
        </div>
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
        {post_Content.bid_list.map((e: any, i: any) => (
          <BidItem bid={e} postOwner={post_Content.post_owner} />
        ))}
      </div>
    </div>
  );
}

export default Page;
