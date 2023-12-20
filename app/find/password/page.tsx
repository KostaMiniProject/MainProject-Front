"use client";
import React, { useState } from "react";
import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { findPassword } from "@/apis/FindPasswordApi";
import Header from "@/components/Header";

function Page() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const router = useRouter();

  async function handleFindPassword(
    email: string,
    name: string,
    phone: string
  ) {
    try {
      // 유효성 검사를 통과한 경우 회원가입 요청
      const userData = {
        email: email,
        name: name,
        phone: phone,
      };
      const findEmail = await findPassword(userData);
      // console.log('Email:', findEmail.email);
      // Do something with the email data

      // findId 함수에서 서버에서 에러가 발생하지 않는다면, '/success'로 이동
      router.push("/find/password/success");
    } catch (error: any) {
      // 'error' 변수를 'any' 타입으로 선언하여 사용
      alert((error as Error).message || "입력한 정보가 일치하지 않습니다.");
    }
  }

  return (
    <div>
      <Header title="비밀번호 찾기"></Header>
      <div className="w-full flex-col flex">
        <div className="text-[20px] mt-[100px] mb-[50px] m-[auto] font-[600]">
          아래내용을 작성해주세요.
        </div>
      </div>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-[20px] my-[10px]">이메일</div>
          <InputBox
            onChange={setEmail}
            message="이메일을 입력해주세요."
          ></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] mt-[10px] my-[10px]">이름</div>
          <InputBox
            onChange={setName}
            message="이름을 입력해주세요."
          ></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] mt-[10px] my-[10px]">전화번호</div>
          <InputBox
            onChange={setPhone}
            message="전화번호를 입력해주세요. (ex) 010-1234-1234"
          ></InputBox>
        </div>
        <div className="text-center pt-[50px] my-[10px]">
          <Button
            text="비밀번호 찾기"
            fontSize={18}
            height={5}
            rounded="soft"
            onClick={() => {
              handleFindPassword(email, name, phone);
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
