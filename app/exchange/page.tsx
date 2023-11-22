import React from 'react';
import Scarch from '@/components/Search';
import ExchangePost from '@/components/exchange/ExchangePost';

function Page() {
  return (
    <div>
      <Scarch />
      {/* 컨텐츠 */}
      <div className="mx-[15px]">
        {/* 카테고리 */}
        <div className="bg-white flex">
          <div>카테고리1</div>
          <div>카테고리2</div>
          <div>카테고리3</div>
        </div>
        {/* ExchangePost 리스트 */}
        <div>
          <ExchangePost />
          <div>List2</div>
          <div>List3</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
