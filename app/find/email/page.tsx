"use client";
import React, { useState } from "react";
import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { findId } from "@/api/FindIdApi";

function Page() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();

  async function handleFindId(name: string, phone: string) {
    try {
      // 유효성 검사를 통과한 경우 회원가입 요청
      const userData = {
        name: name,
        phone: phone
      };
        const findEmail = await findId(userData);
        // console.log('Email:', findEmail.email);
        // Do something with the email data
      
      // findId 함수에서 서버에서 에러가 발생하지 않는다면, '/success'로 이동
      router.push(`/find/email/success?email=${findEmail.email}`);
    } catch (error: any) {
        // 'error' 변수를 'any' 타입으로 선언하여 사용
        alert((error as Error).message || '입력한 정보가 일치하지 않습니다.');
      }
  }

  return (
    <div>
      <div className="w-full flex-col flex">
        <div className="text-[40px] mt-[20px] mb-[150px]">ID찾기</div>
      </div>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-[20px] my-[10px] font-[600]">이름</div>
          <InputBox onChange={setName}></InputBox>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] pt-[50px] my-[10px] font-[600]">휴대전화번호</div>
          <InputBox onChange={setPhone} type="password"></InputBox>
        </div>
        <div className="text-center pt-[50px] my-[20px]">
          <Button
            text="아이디 찾기"
            fontSize={18}
            height={5}
            rounded="soft"
            onClick={() => {
              handleFindId(name, phone);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Page;