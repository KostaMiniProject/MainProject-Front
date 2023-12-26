'use client';
import React, { useState } from 'react';
import Logo from '@/image/Logo.png';
import NaverButton from '@/image/NaverButton.png';
import KakaoButton from '@/image/KakaoButton.png';
import GoogleButton from '@/image/GoogleButton.png';
import Image from 'next/image';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { Login } from '@/apis/Login';
import { useRecoilState } from 'recoil';
import { token, userId } from '@/store/atoms';
import Link from 'next/link';

function page() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [accessToken, setAccessToken] = useState();
  const [accessToken, setAccessToken] = useRecoilState(token);
  const [accessUserId, setAccessUserId] = useRecoilState(userId);
  const router = useRouter();

  function handleFindEmail() {
    router.push('/find/email');
  }

  function handleFindPassword() {
    router.push('/find/password');
  }

  function handleSignUp() {
    router.push('/signup');
  }

  async function handleLogin(email: string, password: string) {
    try {
      const loginToken: any = await Login(email, password);
      console.log(loginToken);
      // 토큰을 저장하고 필요한 작업 수행
      setAccessToken(loginToken.token);
      setAccessUserId(loginToken.userId);
      router.push('/');
      // 다른 작업 수행 (예: 페이지 리디렉션)
    } catch (error: any) {
      // 로그인 실패 시의 처리
      alert('로그인에 실패하였습니다.');
      console.error('로그인 실패:', error.message);
    }
    console.log(document.cookie);
  }

  return (
    <div>
      <div className="w-full flex-col flex items-center text-center justify-center">
        <div className="text-[40px] mb-[10px] py-[60px]">가치잇솝</div>
        <Image src={Logo} width={120} height={120} alt="로고" priority></Image>
      </div>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-[20px] my-[10px] font-[600]">이메일</div>
          <InputBox onChange={setEmail}></InputBox>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호</div>
          <InputBox onChange={setPassword} type="password"></InputBox>
        </div>
        <div className="text-center my-[20px] cursor-pointer">
          <Button
            text="로그인 하기"
            fontSize={18}
            height={5}
            rounded="soft"
            onClick={() => {
              handleLogin(email, password);
            }}
          ></Button>
        </div>
        <div className="flex items-center justify-center text-[14px] text-gray">
          <div onClick={handleFindEmail} className="cursor-pointer">
            아이디 찾기
          </div>
          <div className="mx-[10px]">|</div>
          <div onClick={handleFindPassword} className="cursor-pointer">
            비밀번호 찾기
          </div>
          <div className="mx-[10px]">|</div>
          <div onClick={handleSignUp} className="cursor-pointer">
            회원 가입
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center text-[20px] mb-[5px] py-[5px]">
            {' '}
            SNS 로그인
          </div>
          <div className="flex items-center justify-center text-[14px] text-gray">
            
            <Link href={'https://wass.itsop.shop/oauth2/authorization/naver'}>
              <Image
                src={NaverButton}
                width={60}
                height={60}
                alt="네이버 버튼"
                priority
              ></Image>
            </Link>
            <div className="mx-[20px]">|</div>
            <Link href={'https://wass.itsop.shop/oauth2/authorization/kakao'}>
              <Image
                src={KakaoButton}
                width={60}
                height={60}
                alt="카카오 버튼"
                priority
              ></Image>
            </Link>
            <div className="mx-[20px]">|</div>
            <Link
              href={
                'https://wass.itsop.shop/oauth2/authorization/google?redirect_uri=http://wass.itsop.shop/login/oauth2/code/google'
              }
            >
              <Image
                src={GoogleButton}
                width={60}
                height={60}
                alt="구글 버튼"
                priority
              ></Image>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
