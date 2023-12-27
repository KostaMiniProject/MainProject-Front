'use client';
import React, { useState, useCallback, useEffect } from 'react';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import Header from '@/components/Header';
import PostCode from '@/components/signup/PostCode';
import { postEmailCheck } from '@/apis/EmailCheckApi';
import { postEmailSend } from '@/apis/EmailSendApi';
import { useRouter } from 'next/navigation';
import { relative } from 'path';
import { postSignUp } from '@/apis/SignUpApi';

function page() {
  const [nickName, setNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailCheckNum, setEmailCheckNum] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState({
    zcode: '',
    roadAddr: '',
    jibunAddr: '',
  });
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  // 유효성 검사 메세지 출력
  const [nickNameMessage, setNickNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [phoneMessage, setPhoneMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');
  const [addressMessage, setAddressMessage] = useState<string>('');
  // 유효성 검사 여부 확인
  const [isNickName, setIsNickName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const readCheckAddress = () => {
    const { zcode, jibunAddr, roadAddr } = address;
    return !(zcode && (jibunAddr || roadAddr));
  };

  const router = useRouter();

  // # 이메일 발송
  async function handleEmailSend(email: string) {
    try {
      // 유효성 검사를 통과한 경우 회원가입 요청
      const userData = {
        email: email,
      };
      const emailSend = await postEmailSend(userData);

      // findId 함수에서 서버에서 에러가 발생하지 않는다면, '/success'로 이동
      // router.push("/find/password/success");
    } catch (error: any) {
      // 'error' 변수를 'any' 타입으로 선언하여 사용
      alert((error as Error).message || '입력한 정보가 일치하지 않습니다.');
    }
  }

  // # 이메일 검사
  async function handleEmailCheck(email: string, emailCheckNum: string) {
    try {
      // 유효성 검사를 통과한 경우 회원가입 요청
      const userData = {
        email: email,
        emailCheckNum: emailCheckNum,
      };
      const emailCheck = await postEmailCheck(userData);

      // findId 함수에서 서버에서 에러가 발생하지 않는다면, '/success'로 이동
      // router.push("/find/password/success");
    } catch (error: any) {
      // 'error' 변수를 'any' 타입으로 선언하여 사용
      alert((error as Error).message || '입력한 정보가 일치하지 않습니다.');
    }
  }

  const onClickAddrBtn = () => {
    PostCode({ info: address, setInfo: setAddress });
  };

  // const onChangeDetailAddr = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAddress({ ...address, detailAddr: e.target.value });
  // };

  const checkAddress = (addressCurrent: string) => {
    if (addressCurrent.length === 0) {
      setAddressMessage('주소는 필수 항목입니다.');
      setIsAddress(false);
    }
  };

  const checkNickname = (nickNameCurrent: string) => {
    if (nickNameCurrent.length === 0) {
      setNickNameMessage('닉네임은 필수 항목입니다.');
      setIsNickName(false);
    }
  };

  const checkEmail = (emailCurrent: string) => {
    if (emailCurrent.length === 0) {
      setEmailMessage('이메일은 필수 항목입니다.');
      setIsEmail(false);
    }
  };

  const checkPhone = (phoneCurrent: string) => {
    if (phoneCurrent.length === 0) {
      setPhoneMessage('휴대폰번호는 필수 항목입니다.');
      setIsPhone(false);
    }
  };

  const checkPassword = (passwordCurrent: string) => {
    if (passwordCurrent.length === 0) {
      setPasswordMessage('비밀번호는 필수 항목입니다.');
      setIsPassword(false);
    }
  };

  const checkPasswordConfirm = (passwordConfirmCurrent: string) => {
    if (passwordConfirmCurrent.length === 0) {
      setPasswordConfirmMessage('비밀번호 확인은 필수 항목입니다.');
      setIsPasswordConfirm(false);
    }
  };

  const onChangeNickName = useCallback((nickNameCurrent: string) => {
    const nickNameRegex = /^[가-힣a-zA-Z0-9]{2,13}$/;
    setNickName(nickNameCurrent);
    checkNickname(nickNameCurrent);

    if (!nickNameRegex.test(nickNameCurrent)) {
      setNickNameMessage('2글자 이상 14글자 미만으로 입력해주세요.');
      setIsNickName(false);
    } else {
      setNickNameMessage('올바른 닉네임 형식입니다.');
      setIsNickName(true);
    }
  }, []);

  const onChangeEmail = useCallback((emailCurrent: string) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setEmail(emailCurrent);
    checkEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('올비른 이메일 형식입니다.');
      setIsEmail(true);
    }
  }, []);

  const onChangePhone = useCallback((phoneCurrent: string) => {
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    setPhone(phoneCurrent);
    checkPhone(phoneCurrent);

    if (!phoneRegex.test(phoneCurrent)) {
      setPhoneMessage('휴대폰번호 11자리를 입력해주세요.');
      setIsPhone(false);
    } else {
      setPhoneMessage('올바른 휴대폰 번호 형식입니다.');
      setIsPhone(true);
    }
  }, []);

  const onChangeDetailAddr = useCallback((addressCurrent: string) => {
    setAddressDetail(addressCurrent);
    checkAddress(addressCurrent);
    if (addressCurrent.length != 0) {
      setAddressMessage(' ');
      setIsAddress(true);
    }
  }, []);

  const onChangePassword = useCallback((passwordCurrent: string) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setPassword(passwordCurrent);
    checkPassword(passwordCurrent);
    if (passwordConfirm !== passwordCurrent) {
      setPasswordConfirmMessage('비밀번호와 비밀번호 확인이 동일하지 않습니다.');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('비밀번호와 비밀번호 확인이 동일합니다.');
      setIsPasswordConfirm(true);
    }
  
    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호 형식입니다.');
      setIsPassword(true);
    }
  }, [passwordConfirm]);

  const onChangePasswordConfirm = useCallback(
    (passwordConfirmCurrent: string) => {
      setPasswordConfirm(passwordConfirmCurrent);
      checkPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호와 비밀번호 확인이 동일합니다.');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage(
          '비밀번호와 비밀번호 확인이 동일하지 않습니다.'
        );
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  // useEffect(() => {
  //   onChangeNickName(nickName);
  //   onChangeEmail(email);
  //   onChangePhone(phone);
  //   onChangePassword(password);
  //   onChangeCheckPassword(checkPassword);
  // }, []);

  const signUp = async () => {
    // 비동기 처리
    // 유효성 검사를 통과한 경우 회원가입 요청
    const userData = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      nickName: nickName,
      address: address,
      addressDetail: addressDetail,
      phone: phone,
    };
    if (
      isNickName &&
      isEmail &&
      (address.jibunAddr || address.roadAddr) &&
      address &&
      isAddress &&
      isPhone &&
      isPassword &&
      isPasswordConfirm
    ) {
      try {
        console.log(userData);
        await postSignUp(userData);
        alert('회원가입이 완료되었습니다.');
        router.push('/login');
      } catch (error) {
        alert('회원가입 실패');
      }
    } else {
      //alert("입력한 정보를 다시 확인해주세요.");
      checkNickname(nickName);
      checkEmail(email);
      checkPhone(phone);
      checkPassword(password);
      checkPasswordConfirm(passwordConfirm);
      checkAddress(addressDetail);
    }
  };

  // useEffect(() => {
  //   if (
  //     address.zcode &&
  //     (address.jibunAddr || address.roadAddr) &&
  //     address.detailAddr
  //   ) {
  //     setAddressMessage("");
  //   }
  // }, [address]); // 의존성 배열에 address 상태 전체를 넣음

  return (
    <div>
      <Header backNav title="회원가입"></Header>
      <div className="mx-[15px]">
        <div className="">
          <div className="text-header my-[10px] font-[600]">닉네임</div>
          <InputBox
            onChange={onChangeNickName}
            message="닉네임을 입력해주세요."
          ></InputBox>
          <span
            className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}
          >
            <p
              style={{
                color:
                  nickName.length > 0 ? (isNickName ? 'green' : 'red') : 'red',
              }}
            >
              {nickNameMessage}
            </p>
          </span>
        </div>
        <div className="">
          <div className="text-header my-[10px] font-[600]">이메일</div>
          <div className="flex mb-[6px] justify-between">
            <InputBox
              onChange={(e) => {
                setEmail(e);
                onChangeEmail(e);
              }}
              message="이메일을 작성해주세요."
            ></InputBox>
            <div className="m-[5px]"></div>
            <Button
              text="인증번호 발송"
              fontSize={18}
              height={5}
              rounded="soft"
              onClick={() => {
                handleEmailSend(email);
              }}
            />
          </div>
          <span
            className={`style={{
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 24px;
          letter-spacing: -1px;
          position: absolute;
          bottom: -10px;
          left: 0;}}`}
          >
            <p
              style={{
                color: email.length > 0 ? (isEmail ? 'green' : 'red') : 'red',
              }}
            >
              {emailMessage}
            </p>
          </span>
          <div className="flex mb-[6px] justify-between">
            <InputBox
              onChange={(e) => {
                setEmailCheckNum(e);
                // 이메일 인증 확인 검사 로직 필요
              }}
              message="인증번호를 입력해주세요."
            ></InputBox>
            <div className="m-[5px]"></div>
            <Button
              text="인증번호 확인"
              fontSize={18}
              height={5}
              rounded="soft"
              onClick={() => {
                handleEmailCheck(email, emailCheckNum);
              }}
            />
          </div>
        </div>
        <div className="">
          <div className="text-header my-[10px] font-[600]">전화번호</div>
          <InputBox
            onChange={onChangePhone}
            message="전화번호를 작성해주세요."
          ></InputBox>
          <span
            className={`style={{
          font-weight: 500;
          font-size: 1.6rem;
          line-height: 24px;
          letter-spacing: -1px;
          position: absolute;
          bottom: -10px;
          left: 0;}}`}
          >
            <p
              style={{
                color: phone.length > 0 ? (isPhone ? 'green' : 'red') : 'red',
              }}
            >
              {phoneMessage}
            </p>
          </span>
        </div>
        <div className="">
          <div className="text-header my-[10px] font-[600]">주소</div>
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
            <InputBox
              onChange={onChangeDetailAddr}
              type="text"
              message="우편번호 찾기 후 상세 주소를 입력해주세요."
              readOnly={readCheckAddress()}
            ></InputBox>
          </div>
          <span
            className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}
          >
            <p style={{ color: 'red' }}>{addressMessage}</p>
          </span>
        </div>
        <div className="my-[20px]">
          <div className="text-header my-[10px] font-[600]">비밀번호</div>
          <InputBox
            onChange={onChangePassword}
            type="password"
            message="비밀번호를 입력해주세요."
          ></InputBox>
          <span
            className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}
          >
            <p
              style={{
                color:
                  password.length > 0 ? (isPassword ? 'green' : 'red') : 'red',
              }}
            >
              {passwordMessage}
            </p>
          </span>
        </div>
        <div className="my-[20px]">
          <div className="text-header my-[10px] font-[600]">비밀번호 확인</div>
          <InputBox
            onChange={onChangePasswordConfirm}
            type="password"
            message="비밀번호를 재입력해주세요."
          ></InputBox>
          <span
            className={`style={{
            font-weight: 500;
            font-size: 1.6rem;
            line-height: 24px;
            letter-spacing: -1px;
            position: absolute;
            bottom: -10px;
            left: 0;}}`}
          >
            <p
              style={{
                color:
                  passwordConfirm.length > 0
                    ? isPasswordConfirm
                      ? 'green'
                      : 'red'
                    : 'red',
              }}
            >
              {passwordConfirmMessage}
            </p>
          </span>
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
