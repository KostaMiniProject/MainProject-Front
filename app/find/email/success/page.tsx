"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Success() {
  const router = useRouter();

  const searchParams = useSearchParams();
  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-[40px] mt-[20px] mb-[150px]">이메일 확인</h1>
      <p className="text-lg">고객님의 이메일은 다음과 같습니다 <span className="font-bold">{searchParams.get('email')}</span></p>
    </div>
  );
}

export default Success;