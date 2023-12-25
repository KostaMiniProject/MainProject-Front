'use client';
import { postCheckAuth } from '@/apis/CheckAuthApi';
import { token, userId } from '@/store/atoms';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { FaCheck } from 'react-icons/fa6';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import Header from '@/components/Header';
import PostCode from '@/components/signup/PostCode';
import { postSignUp, putSignUp } from '@/apis/SignUpApi';
function page() {
  const searchParams = useSearchParams();

  const [accessToken, setAccessToken] = useRecoilState(token);
  const [accessUserId, setAccessUserId] = useRecoilState(userId);
  const [accessUserEmail, setAccessUserEmail] = useState('');
  const router = useRouter();
  const [nickName, setNickName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState({
    zcode: '',
    roadAddr: '',
    jibunAddr: '',
  });
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [nickNameMessage, setNickNameMessage] = useState<string>('');
  const [phoneMessage, setPhoneMessage] = useState<string>('');
  const [addressMessage, setAddressMessage] = useState<string>('');
  const [isNickName, setIsNickName] = useState<boolean>(false);
  const [isPhone, setIsPhone] = useState<boolean>(false);
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [resData, setResData] = useState<any>();
  const readCheckAddress = () => {
    const { zcode, jibunAddr, roadAddr } = address;
    return !(zcode && (jibunAddr || roadAddr));
  };
  const emailInputRef: any = useRef();

  const onClickAddrBtn = () => {
    PostCode({ info: address, setInfo: setAddress });
  };

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

  const checkPhone = (phoneCurrent: string) => {
    if (phoneCurrent.length === 0) {
      setPhoneMessage('휴대폰번호는 필수 항목입니다.');
      setIsPhone(false);
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

  const signUp = async () => {
    const userData = {
      email: accessUserEmail,
      nickName: nickName,
      address: address,
      addressDetail: addressDetail,
      phone: phone,
    };
    if (
      isNickName &&
      (address.jibunAddr || address.roadAddr) &&
      address &&
      isAddress &&
      isPhone
    ) {
      try {
        // console.log(userData);
        await putSignUp(userData);
        document.cookie = `token=${token}; path=/;`;
        router.push('/');
      } catch (error) {
        alert('회원가입 실패');
      }
    } else {
      checkNickname(nickName);
      checkPhone(phone);
      checkAddress(addressDetail);
    }
  };
  useEffect(() => {
    const data: string = searchParams.get('token') ?? '';
    const checkAuth = async () => {
      const body = {
        token: data,
      };
      try {
        const res: any = await postCheckAuth(body);
        setResData(res);
        //additionalInfo
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);
  useEffect(() => {
    if (resData) {
      const getData = async () => {
        try {
          const data = await resData.json(); // json() 메서드 앞에 await 추가
          const token = resData.headers.get('Authorization');
          document.cookie = `userId=${data.userId}; path=/;`;
          console.log(data);
          if (!data.additionalInfo) {
            setAccessToken(token);
            setAccessUserId(data.userId);
            setAccessUserEmail(data.userEmail);
            setIsAuth(true);
          } else {
            document.cookie = `token=${token}; path=/;`;
            router.push('/');
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
  
      getData(); // getData 함수 호출
    }
  }, [resData]);

  return (
    <div>
      {isAuth ? (
        <div>
          <div>
            <Header backNav title="회원가입"></Header>
            <div className="mx-[15px]">
              <div className="">
                <div className="text-header my-[10px] font-[600px]">이메일</div>
                <div className="p-2 border-[0.5px] rounded-[8px] h-[40px] w-full">
                  {/* 인증된 이메일값 필요 */}
                  {accessUserEmail}
                </div>
                <div className="flex items-center text-gray">
                  <FaCheck />
                  <p>계정이 인증되었습니다.</p>
                </div>
              </div>
              <div className="">
                <div className="text-header my-[10px] font-[600px]">닉네임</div>
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
                        nickName.length > 0
                          ? isNickName
                            ? 'green'
                            : 'red'
                          : 'red',
                    }}
                  >
                    {nickNameMessage}
                  </p>
                </span>
              </div>
              <div className="">
                <div className="text-header my-[10px] font-[600px]">
                  전화번호
                </div>
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
                      color:
                        phone.length > 0 ? (isPhone ? 'green' : 'red') : 'red',
                    }}
                  >
                    {phoneMessage}
                  </p>
                </span>
              </div>
              <div className="">
                <div className="text-header my-[10px] font-[600px]">주소</div>
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
        </div>
      ) : (
        <div>인증 진행중</div>
      )}
    </div>
  );
}

export default page;
