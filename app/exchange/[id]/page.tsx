import { getProfile } from '@/api/ProfileApi';
import Profile from '@/components/Profile';
import Carousel from '@/components/carousel/Carousel';
import BidItem from '@/components/bid/BidItem';
import { getBidList } from '@/api/BidApi';
import Header from '@/components/Header';
import { MdMoreVert } from 'react-icons/md';

import TempImg from '@/image/Logo.png';

function Page({ params }: { params: any }) {
  const images = [TempImg, TempImg, TempImg]; // 이미지 배열
  const bidList = getBidList();
  const borderStyle = 'border-solid border-black border-[1px]';
  return (
    <div>
      <Header title="교환 상세">
        <MdMoreVert size={30} />
      </Header>
      <div className="h-[360px]">
        <Carousel images={images} />
      </div>
      <Profile profile={getProfile()} />
      <div className="flex flex-col m-[15px]">
        <div className={`${borderStyle} p-[10px] rounded-t-[5px]`}>{`1.물건명
        2.개봉여부`}</div>
        <div className="flex">
          <div
            className={`${borderStyle} flex-1 text-center py-[10px] rounded-bl-[5px]`}
          >
            입찰 목록
          </div>
          <div
            className={`${borderStyle} flex-1 text-center py-[10px] rounded-br-[5px]`}
          >
            거절 내역 보기
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 m-[15px]">
        {bidList.map((e: any, i: any) => (
          <BidItem bid={e} />
        ))}
      </div>
      <div className="h-[60px]"></div>
    </div>
  );
}

export default Page;
