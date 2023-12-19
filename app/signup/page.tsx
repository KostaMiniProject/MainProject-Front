'use client';
import React, { useState } from 'react';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import Header from '@/components/Header';
import PostCode from '@/components/signup/PostCode';
import { postSignUp } from '@/apis/SignUpApi';
import { useRouter } from 'next/navigation';

function page() {
  const [name, setName] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [phone, setPhone] = useState<String>('');
  const [address, setAddress] = useState({
    zcode: '',
    roadAddr: '',
    jibunAddr: '',
    detailAddr: '',
  });
  const [password, setPassword] = useState<String>('');
  const [checkPassword, setCheckPassword] = useState<String>('');
  const router = useRouter();

  const onClickAddrBtn = () => {
    PostCode({ info: address, setInfo: setAddress });
  };

  const onChangeDetailAddr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, detailAddr: e.target.value });
  };

  function signUp() {
    // 간단한 유효성 검사
    if (!validateEmail(email)) {
      alert('유효한 이메일을 입력하세요.');
      return;
    }

    if (!validatePassword(password)) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    if (password !== checkPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validateName(name)) {
      alert('이름은 최소 2자 이상이어야 합니다.');
      return;
    }

    if (!validatePhone(phone)) {
      alert('유효한 전화번호를 입력하세요.');
      return;
    }

    // 유효성 검사를 통과한 경우 회원가입 요청
    const userData = {
      email: email,
      password: password,
      checkPassword: checkPassword,
      name: name,
      address: address,
      phone: phone,
    };
    try {
      postSignUp(userData);
      router.push('/login');
    } catch (error) {
      alert('로그인 실패');
    }
  }

  // 간단한 유효성 검사 함수들
  function validateEmail(email: String) {
    // 여기에 이메일 유효성 검사 로직 추가
    // 예: 정규 표현식 사용
    return email.trim() !== ''; // 간단한 비어있지 않은 체크
  }

  function validatePassword(password: String) {
    // 여기에 비밀번호 유효성 검사 로직 추가
    return password.length >= 8; // 최소 8자 이상
  }

  function validateName(name: String) {
    // 여기에 이름 유효성 검사 로직 추가
    return name.length >= 2; // 최소 2자 이상
  }

  function validatePhone(phone: String) {
    // 여기에 전화번호 유효성 검사 로직 추가
    // 예: 정규 표현식 사용
    return phone.trim() !== ''; // 간단한 비어있지 않은 체크
  }
  return (
    <div>
      <Header backNav title="회원가입"></Header>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">이름</div>
          <InputBox onChange={setName}></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">이메일</div>
          <InputBox onChange={setEmail}></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">전화번호</div>
          <InputBox onChange={setPhone}></InputBox>
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">주소</div>
          <div className="flex mb-[6px] justify-between">
            <input
              type="text"
              placeholder="우편 번호"
              className="p-2 border-[2px] rounded-[20px] h-[40px] w-[48%]"
              value={address.zcode}
              readOnly
            />
            <Button
              text="우편번호 찾기"
              fontSize={18}
              height={5}
              rounded="soft"
              onClick={onClickAddrBtn}
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="도로명 주소"
              className="p-2 border-[2px] rounded-[20px] h-[40px] w-[48%] mr-[5px]"
              value={address.roadAddr}
              readOnly
            />
            <input
              type="text"
              placeholder="지번 주소"
              className="p-2 border-[2px] rounded-[20px] h-[40px] w-[50%]"
              value={address.jibunAddr}
              readOnly
            />
          </div>
          <div className="w-full mt-[10px]">
            <input
              type="text"
              placeholder="상세 주소"
              className="p-2 w-full border-[2px] rounded-[20px] h-[40px]"
              value={address.detailAddr}
              onChange={onChangeDetailAddr}
            />
          </div>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호</div>
          <InputBox onChange={setPassword} type="password"></InputBox>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호 확인</div>
          <InputBox onChange={setCheckPassword} type="password"></InputBox>
        </div>
        <div className="text-center my-[20px]">
          <Button
            text="회원가입 하기"
            fontSize={18}
            height={5}
            rounded="soft"
            onClick={signUp}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default page;
