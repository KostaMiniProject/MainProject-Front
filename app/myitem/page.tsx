"use client";
import { getProfile } from "@/api/ProfileApi";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import React from "react";

import Item from "@/components/item/Item";
import BottomFixed from "@/components/BottomFixed";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Scarch from "@/components/Search";
import { getItemList } from "@/api/ItemApi";

function page() {
  const itemList = getItemList();
  const route = useRouter();

  return (
    <div className="relative">
      <Header title="내 물건" backNav></Header>
      {/* 검색창 */}
      <Scarch />
      {/* 물건 리스트 */}
      <div className="mx-[15px]">
        {itemList.map((e: any, i: any) => {
          return (
            <div
              key={i}
              onClick={() => {
                route.push(`/itemdetail/${e.id}`);
              }}
            >
              <Item item={e} key={i} />
            </div>
          );
        })}
      </div>
      {/* 하단 고정 버튼 */}
      <BottomFixed>
        <div className="flex justify-end">
          <Button text="+ 글쓰기" height={10} fontSize={16} />
        </div>
      </BottomFixed>
    </div>
  );
}

export default page;
