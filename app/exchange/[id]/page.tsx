import { getProfile } from '@/api/ProfileApi';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import BidItem from '@/components/bid/BidItem';
import { getBidList } from '@/api/BidApi';
import Header from '@/components/Header';
import { MdDeleteForever, MdEditNote, MdReport } from 'react-icons/md';
import { getExchangePost } from '@/api/ExchangePostApi';

function Page({ params }: { params: any }) {
  const images = ['', '', '']; // 이미지 배열
  const post_Content = getExchangePost(params.id);
  const borderStyle = 'border-solid border-black border-[1px]';
  return (
    <div>
      <Header title="교환 상세">
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
        <Carousel images={images} />
      </div>
      {/* 프로필 섹션 */}
      <Profile profile={post_Content.profile} />
      {/* 교환 게시글 본문 */}
      <div className="flex flex-col m-[15px]">
        <div className={`${borderStyle} p-[10px] rounded-t-[5px]`}>
          {post_Content.content}
        </div>
        <div className="flex">
          <div
            className={`${borderStyle} flex-1 text-center py-[10px] rounded-bl-[5px]`}
          >
            입찰 목록
          </div>
          {post_Content.post_owner ? (
            <div
              className={`${borderStyle} flex-1 text-center py-[10px] rounded-br-[5px]`}
            >
              거절 내역 보기
            </div>
          ) : (
            <div
              className={`${borderStyle} flex-1 text-center py-[10px] rounded-br-[5px]`}
            >
              입찰 하기
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 m-[15px]">
        {post_Content.bid_list.map((e: any, i: any) => (
          <BidItem bid={e} />
        ))}
      </div>
    </div>
  );
}

export default Page;
