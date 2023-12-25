'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import InputBox from '@/components/InputBox';
import Button from '@/components/Button';
import Header from '@/components/Header';
import PostCode from '@/components/signup/PostCode';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { relative } from 'path';
import { MdAddCircleOutline } from 'react-icons/md';
import { getMyProfile, putEditUser } from '@/apis/ProfileApi';

interface profileType {
  address: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  userStatus: string;
}

function page() {
  const [profile, setProfile] = useState<profileType>();
  const [nickName, setNickName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState({
    zcode: '',
    roadAddr: '',
    jibunAddr: '',
  });
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [existingPassword, setExistingPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [nickNameMessage, setNickNameMessage] = useState<string>('');
  const [phoneMessage, setPhoneMessage] = useState<string>('');
  const [existingPasswordMessage, setExistingPasswordMessage] =
    useState<string>('');
  const [newPasswordMessage, setNewPasswordMessage] = useState<string>('');
  const [addressMessage, setAddressMessage] = useState<string>('');

  const [isNickName, setIsNickName] = useState<boolean>(true);
  const [isPhone, setIsPhone] = useState<boolean>(true);
  const [isExistingPassword, setIsExistingPassword] = useState<boolean>(false);
  const [isNewPassword, setIsNewPassword] = useState<boolean>(false);
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File>();

  const [isEditAddress, setIsEditAddress] = useState(false); // 주소 수정 가능 여부
  const [isEditPassword, setIsEditPassword] = useState(false); // 비밀번호 수정 가능 여부
  const router = useRouter();
  const nickNameRef: any = useRef();
  const phoneRef: any = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
        setNickName(data.name);
        nickNameRef.current.value = data.name;
        setPhone(data.phone);
        phoneRef.current.value = data.phone;
        onChangeNickName;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // 주소 수정 토글 함수
  const toggleEditAddress = () => {
    setIsEditAddress(!isEditAddress);
  };

  // 비밀번호 수정 토글 함수
  const toggleEditPassword = () => {
    setIsEditPassword(!isEditPassword);
  };

  const readCheckAddress = () => {
    const { zcode, jibunAddr, roadAddr } = address;
    return !(zcode && (jibunAddr || roadAddr));
  };

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

  const checkExistingPassword = (existingPasswordCurrent: string) => {
    if (existingPasswordCurrent.length === 0) {
      setExistingPasswordMessage('비밀번호는 필수 항목입니다.');
      setIsExistingPassword(false);
    }
  };

  const checkNewPassword = (newPasswordCurrent: string) => {
    if (newPasswordCurrent.length === 0) {
      setNewPasswordMessage('비밀번호는 필수 항목입니다.');
      setIsNewPassword(false);
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

  const onChangeExistingPassword = useCallback(
    (existingPasswordCurrent: string) => {
      const existingPasswordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      setExistingPassword(existingPasswordCurrent);
      checkExistingPassword(existingPasswordCurrent);

      if (!existingPasswordRegex.test(existingPasswordCurrent)) {
        setExistingPasswordMessage(
          '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.'
        );
        setIsExistingPassword(false);
      } else {
        setExistingPasswordMessage('올바른 비밀번호 형식입니다.');
        setIsExistingPassword(true);
      }
    },
    []
  );

  const onChangeNewPassword = useCallback(
    (newPasswordCurrent: string) => {
      const newPasswordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      setNewPassword(newPasswordCurrent);
      checkNewPassword(newPasswordCurrent);

      if (existingPassword === newPasswordCurrent) {
        setNewPasswordMessage('기존 비밀번호와 새 비밀번호가 동일합니다.');
        setIsNewPassword(false);
      } else if (!newPasswordRegex.test(newPasswordCurrent)) {
        setNewPasswordMessage(
          '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.'
        );
        setIsNewPassword(false);
      } else {
        setNewPasswordMessage('올바른 비밀번호 형식입니다.');
        setIsNewPassword(true);
      }
    },
    [existingPassword]
  );

  function openFileInput() {
    // 파일 입력 엘리먼트를 클릭하여 파일 선택 다이얼로그 열기
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImages(file);

      // 이미지 URL 생성
      const imageUrl = URL.createObjectURL(file);

      // 프로필 상태 업데이트
      setProfile((prev: any) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  }

  const editProfile = async () => {
    let userData: any = {
      nickName: nickName,
      phone: phone,
    };

    if (isEditPassword) {
      userData = {
        ...userData,
        existingPassword: existingPassword,
        newPassword: newPassword,
      };
    }

    if (isEditAddress) {
      userData = {
        ...userData,
        address: address,
        addressDetail: addressDetail,
      };
    }

    // 이제 여기서 각 입력값에 대한 유효성 검사를 수행합니다.

    let isValid = isNickName && isPhone;

    if (isEditPassword) {
      console.log('패스워드가 비어있음');
      isValid = isValid && isExistingPassword && isNewPassword;
      if (!isValid) {
        checkExistingPassword(existingPassword);
        checkNewPassword(newPassword);
      }
    }

    if (isEditAddress) {
      console.log('주소가 비어있음');

      const isAddressValid =
        address.jibunAddr.trim() !== '' || address.roadAddr.trim() !== '';
      isValid = isValid && isAddressValid && isAddress;
      if (!isValid) {
        checkAddress(addressDetail);
      }
    }

    // 모든 조건이 충족된 경우에만 프로필 업데이트를 진행합니다.
    if (isValid) {
      try {
        console.log(userData);
        const formData = new FormData();
        // 기타 데이터를 JSON 형태로 FormData에 추가
        formData.append(
          'userUpdateDto',
          new Blob([JSON.stringify(userData)], { type: 'application/json' })
        );
        // 이미지 파일을 FormData에 추가
        if (selectedImages instanceof File) {
          formData.append('file', selectedImages);
        }
        console.log(formData);
        await putEditUser(formData);
        router.push('/profile');
      } catch (error) {
        alert('회원수정 실패');
      }
    } else {
      alert('입력한 정보를 다시 확인해주세요.');
    }
  };

  return (
    <div>
      <Header backNav title="내 정보 수정"></Header>
      <div className="mx-[15px]">
        <div className="flex justify-center">
          <div className="h-[120px] w-[120px] bg-black rounded-[50%] overflow-hidden">
            {/* 프로필 사진 */}
            {profile && (
              <Image
                src={profile.profileImage}
                alt="프로필사진"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                width={60}
                height={60}
                className="w-full h-full "
              />
            )}
          </div>
          <div
            className="relative cursor-pointer mt-auto text-subtitle"
            onClick={openFileInput}
          >
            사진 변경
          </div>
          <input
            id="fileInput" // 파일 입력 엘리먼트에 ID 추가
            type="file"
            accept=".jpg, .png"
            onChange={handleFileChange}
            style={{ display: 'none' }} // 화면에 표시되지 않도록 함
          />
        </div>
        <div className="">
          <div className="text-header my-[10px] font-[600]">닉네임</div>
          <InputBox
            ref={nickNameRef}
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
          <div className="text-header my-[10px] font-[600]">전화번호</div>
          <InputBox
            ref={phoneRef}
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
          <div className="text-header my-[10px] font-[600] flex justify-between">
            <div>주소</div>
            <div onClick={toggleEditAddress}>
              주소 변경하기 {isEditAddress ? '▼' : '▲'}
            </div>
          </div>
          {isEditAddress && (
            <div>
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
          )}
        </div>
        <div className="my-[20px]">
          <div className="text-header my-[10px] font-[600] flex justify-between">
            <div>비밀번호</div>
            <div onClick={toggleEditPassword}>
              비밀번호 변경하기 {isEditPassword ? '▼' : '▲'}
            </div>
          </div>
          {isEditPassword && (
            <div>
              <InputBox
                onChange={onChangeExistingPassword}
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
                      existingPassword.length > 0
                        ? isExistingPassword
                          ? 'green'
                          : 'red'
                        : 'red',
                  }}
                >
                  {existingPasswordMessage}
                </p>
              </span>

              <div className="my-[20px]">
                <div className="text-[20px] my-[10px] font-[600]">
                  새 비밀번호
                </div>
                <InputBox
                  onChange={onChangeNewPassword}
                  type="password"
                  message="새 비밀번호를 입력해주세요."
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
                        newPassword.length > 0
                          ? isNewPassword
                            ? 'green'
                            : 'red'
                          : 'red',
                    }}
                  >
                    {newPasswordMessage}
                  </p>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="text-center my-[20px]">
          <Button
            text="수정하기"
            fontSize={18}
            height={5}
            rounded="soft"
            onClick={editProfile}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default page;
