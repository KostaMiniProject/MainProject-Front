'use client';
import React, { useState, useCallback } from 'react';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import Header from '@/components/Header';
import PostCode from '@/components/signup/PostCode';
import { postSignUp } from '@/api/SignUpApi';
import { useRouter } from 'next/navigation';
import { relative } from 'path';

function page() {
  const [name, setName] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [authNum, setAuthNum] = useState<String>('');
  const [showAuthNum, setShowAuthNum] = useState(false);
  const [phone, setPhone] = useState<String>('');
  const [address, setAddress] = useState({
    zcode: '',
    roadAddr: '',
    jibunAddr: '',
    detailAddr: '',
  });
  const [password, setPassword] = useState<String>('');
  const [checkPassword, setCheckPassword] = useState<String>('');

  const [nameMessage, setNameMessage] = useState<string>('');
  const [emaileMessage, setEmailMessage] = useState<string>('');
  const [phoneMessage, setPhoneMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [checkPasswordMessage, setCheckPasswordMessage] = useState<string>('');


  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isCheckPassword, setIsCheckPassword] = useState<boolean>(false);


  const router = useRouter();

  const onClickAddrBtn = () => {
    PostCode({ info: address, setInfo: setAddress });
  };

  const onChangeDetailAddr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, detailAddr: e.target.value });
  };

  const authNumSend = () => {
    setShowAuthNum(true);
  }

  const authNumConfirm = () => {
    setShowAuthNum(false);
  }

  const onChangeName = useCallback((nameCurrent: string) => {
    const nameRegex = /^[가-힣]{2,4}$/
    setName(nameCurrent)

    if (!nameRegex.test(nameCurrent)) {
      setNameMessage('한글로 2글자 이상 5글자 미만으로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMessage('올바른 이름 형식입니다.')
      setIsName(true)
    }
  }, [])

  const onChangeEmail = useCallback((emailCurrent: string) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸습니다.')
      setIsEmail(false)
    } else {
      setEmailMessage('올비른 이메일 형식입니다.')
      setIsEmail(true)
    }
  }, [])

  const onChangePhone = useCallback((phoneCurrent: string) => {
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/
    setPhone(phoneCurrent)

    if (!phoneRegex.test(phoneCurrent)) {
      setPhoneMessage('휴대폰번호 11자리를 입력해주세요.')
      setIsPhone(false)
    } else {
      setPhoneMessage('올바른 휴대폰 번호 형식입니다.')
      setIsPhone(true)
    }
  }, [])

  const onChangePassword = useCallback((passwordCurrent: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.');
      setIsPassword(false)
    } else {
      setPasswordMessage('올바른 비밀번호 형식입니다.')
      setIsPassword(true)
    }
  }, [])

  const onChangeCheckPassword = useCallback((checkPasswordCurrent: string) => {
    setCheckPassword(checkPasswordCurrent)

    if (password === checkPasswordCurrent) {
      setCheckPasswordMessage('비밀번호와 비밀번호 확인이 동일합니다.')
      setIsCheckPassword(true)
    } else {
      setCheckPasswordMessage('비밀번호와 비밀번호 확인이 동일하지 않습니다.')
      setIsCheckPassword(false)
    }
  }, [password])

  const signUp = async () => { 
    // 비동기 처리
    // 유효성 검사를 통과한 경우 회원가입 요청
    const userData = {
      email: email,
      password: password,
      checkPassword: checkPassword,
      name: name,
      address: address,
      phone: phone,
    };
    if (isName && isEmail && address && isPhone && isPassword && isCheckPassword) {
      try {
        postSignUp(userData);
        router.push('/login');
      } catch (error) {
        alert('회원가입 실패');
      }
    } else {
      alert('입력한 정보를 다시 확인해주세요.');
    }
  };

  return (
    <div>
      <Header backNav title="회원가입"></Header>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">이름</div>
          <InputBox onChange={onChangeName}></InputBox>
          {name.length > 0 && <span className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}><p style={{ color: isName ? 'green' : 'red' }}>{nameMessage}</p></span>}
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">이메일</div>
          <div className='flex mb-[6px] justify-between'>
            <InputBox onChange={onChangeEmail}></InputBox>
            <div className='m-[5px]'></div>
            <Button
              text="인증번호 발송"
              fontSize={18}
              height={5}
              rounded="soft"
              onClick={authNumSend}
            />
          </div>
          {email.length > 0 && <span className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}><p style={{ color: isEmail ? 'green' : 'red' }}>{emaileMessage}</p></span>}
          {showAuthNum && (
            <div className='flex mb-[6px] justify-between'>
              <InputBox onChange={setAuthNum}></InputBox>
              <div className='m-[5px]'></div>
              <Button
                text="인증번호 확인"
                fontSize={18}
                height={5}
                rounded="soft"
                onClick={authNumConfirm}
              />
            </div>
          )}
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">전화번호</div>
          <InputBox onChange={onChangePhone}></InputBox>
          {phone.length > 0 && <span className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}><p style={{ color: isPhone ? 'green' : 'red' }}>{phoneMessage}</p></span>}
        </div>
        <div className="">
          <div className="text-[20px] my-[10px] font-[600px]">주소</div>
          <div className="flex mb-[6px] justify-between">
            <input
              type="text"
              placeholder="우편 번호"
              className="p-2 border-[0.5px] rounded-[8px] h-[40px] w-[48%]"
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
              className="p-2 border-[0.5px] rounded-[8px] h-[40px] w-[48%] mr-[5px]"
              value={address.roadAddr}
              readOnly
            />
            <input
              type="text"
              placeholder="지번 주소"
              className="p-2 border-[0.5px] rounded-[8px] h-[40px] w-[50%]"
              value={address.jibunAddr}
              readOnly
            />
          </div>
          <div className="w-full mt-[10px]">
            <input
              type="text"
              placeholder="상세 주소"
              className="p-2 w-full border-[0.5px] rounded-[8px] h-[40px]"
              value={address.detailAddr}
              onChange={onChangeDetailAddr}
            />
          </div>
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호</div>
          <InputBox onChange={onChangePassword} type="password"></InputBox>
          {password.length > 0 && <span className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}><p style={{ color: isPassword ? 'green' : 'red' }}>{passwordMessage}</p></span>}
        </div>
        <div className="my-[20px]">
          <div className="text-[20px] my-[10px] font-[600]">비밀번호 확인</div>
          <InputBox onChange={onChangeCheckPassword} type="password"></InputBox>
          {checkPassword.length > 0 && <span className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}><p style={{ color: isCheckPassword ? 'green' : 'red' }}>{checkPasswordMessage}</p></span>}
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
