"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Button from "@/components/Button";

function Success() {
  const router = useRouter();

  const searchParams = useSearchParams();

  return (
    <div className="container mx-auto mt-10">
      <Header title="아이디 찾기"></Header>
      <div className="w-full flex-col flex">
        <div className="text-[12px] mt-[100px] mb-[10px] m-[auto] ">
          고객님 아이디 찾기가 완료 되었습니다 :)
        </div>
      </div>
      <div className="w-full flex-col flex border border-gray p-5 rounded-md mb-[10px]">
        <div className="text-[16px] m-[auto] font-[600]">
          Email : {searchParams.get("email")}
        </div>
      </div>
      <div className="w-full flex-col flex">
        <Button
          text="작성 완료"
          fontSize={10}
          height={8}
          width={10}
          rounded="soft"
        />
      </div>
    </div>
  );
}

export default Success;
