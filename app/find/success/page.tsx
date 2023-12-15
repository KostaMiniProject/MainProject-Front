"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Success() {
  const router = useRouter();

  const searchParams = useSearchParams();
  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Success Page</h1>
      <p className="text-lg">고객님의 이메일은 <span className="font-bold">{searchParams.get('email')}</span>과 같습니다.</p>
    </div>
  );
}

export default Success;