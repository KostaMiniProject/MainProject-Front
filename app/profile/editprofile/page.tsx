"use client";
import React, { useState, useCallback, useEffect } from "react";
import InputBox from "@/components/InputBox";
import Button from "@/components/Button";
import Header from "@/components/Header";
import PostCode from "@/components/signup/PostCode";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { relative } from "path";

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
    const [nickName, setNickName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState({
        zcode: "",
        roadAddr: "",
        jibunAddr: "",
    });
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [existingPassword, setExistingPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [nickNameMessage, setNickNameMessage] = useState<string>("");
    const [phoneMessage, setPhoneMessage] = useState<string>("");
    const [existingPasswordMessage, setExistingPasswordMessage] = useState<string>("");
    const [newPasswordMessage, setNewPasswordMessage] = useState<string>("");
    const [addressMessage, setAddressMessage] = useState<string>("");
    const [isNickName, setIsNickName] = useState<boolean>(false);
    const [isPhone, setIsPhone] = useState<boolean>(false);
    const [isExistingPassword, setIsExistingPassword] = useState<boolean>(false);
    const [isNewPassword, setIsNewPassword] = useState<boolean>(false);
    const [isAddress, setIsAddress] = useState<boolean>(false);
    const readCheckAddress = () => {
        const { zcode, jibunAddr, roadAddr } = address;
        return !(zcode && (jibunAddr || roadAddr));
    };

    const router = useRouter();

    const onClickAddrBtn = () => {
        PostCode({ info: address, setInfo: setAddress });
    };

    const checkAddress = (addressCurrent: string) => {
        if (addressCurrent.length === 0) {
            setAddressMessage("주소는 필수 항목입니다.");
            setIsAddress(false);
        }
    }

    const checkNickname = (nickNameCurrent: string) => {
        if (nickNameCurrent.length === 0) {
            setNickNameMessage("닉네임은 필수 항목입니다.");
            setIsNickName(false);
        }
    }

    const checkPhone = (phoneCurrent: string) => {
        if (phoneCurrent.length === 0) {
            setPhoneMessage("휴대폰번호는 필수 항목입니다.");
            setIsPhone(false);
        }
    }

    const checkExistingPassword = (existingPasswordCurrent: string) => {
        if (existingPasswordCurrent.length === 0) {
            setExistingPasswordMessage("비밀번호는 필수 항목입니다.");
            setIsExistingPassword(false);
        }
    }

    const checkNewPassword = (newPasswordCurrent: string) => {
        if (newPasswordCurrent.length === 0) {
            setNewPasswordMessage("비밀번호는 필수 항목입니다.");
            setIsNewPassword(false);
        }
    }

    const onChangeNickName = useCallback((nickNameCurrent: string) => {
        const nickNameRegex = /^[가-힣a-zA-Z0-9]{2,13}$/;
        setNickName(nickNameCurrent);
        checkNickname(nickNameCurrent);

        if (!nickNameRegex.test(nickNameCurrent)) {
            setNickNameMessage("2글자 이상 14글자 미만으로 입력해주세요.");
            setIsNickName(false);
        } else {
            setNickNameMessage("올바른 닉네임 형식입니다.");
            setIsNickName(true);
        }
    }, []);

    const onChangePhone = useCallback((phoneCurrent: string) => {
        const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
        setPhone(phoneCurrent);
        checkPhone(phoneCurrent);

        if (!phoneRegex.test(phoneCurrent)) {
            setPhoneMessage("휴대폰번호 11자리를 입력해주세요.");
            setIsPhone(false);
        } else {
            setPhoneMessage("올바른 휴대폰 번호 형식입니다.");
            setIsPhone(true);
        }
    }, []);

    const onChangeDetailAddr = useCallback((addressCurrent: string) => {
        setAddressDetail(addressCurrent);
        checkAddress(addressCurrent);
        if (addressCurrent.length != 0) {
            setAddressMessage(" ");
            setIsAddress(true);
        }
    }, []);

    const onChangeExistingPassword = useCallback((existingPasswordCurrent: string) => {
        const existingPasswordRegex =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        setExistingPassword(existingPasswordCurrent);
        checkExistingPassword(existingPasswordCurrent);

        if (!existingPasswordRegex.test(existingPasswordCurrent)) {
            setExistingPasswordMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
            );
            setIsExistingPassword(false);
        } else {
            setExistingPasswordMessage("올바른 비밀번호 형식입니다.");
            setIsExistingPassword(true);
        }
    }, []);

    const onChangeNewPassword = useCallback((newPasswordCurrent: string) => {
        const newPasswordRegex =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        setNewPassword(newPasswordCurrent);
        checkNewPassword(newPasswordCurrent);

        if (existingPassword === newPasswordCurrent) {
            setNewPasswordMessage("기존 비밀번호와 새 비밀번호가 동일합니다.");
            setIsNewPassword(false);
        } else if (!newPasswordRegex.test(newPasswordCurrent)) {
            setNewPasswordMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
            );
            setIsNewPassword(false);
        } else {
            setNewPasswordMessage("올바른 비밀번호 형식입니다.");
            setIsNewPassword(true);
        }
    }, [existingPassword]);

    const editProfile = async () => {
        const userData = {
            existingPassword: existingPassword,
            newPassword: newPassword,
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
            isPhone &&
            isExistingPassword &&
            isNewPassword
        ) {
            try {
                console.log(userData);
                // postEdit(userData);
                // router.push('/profile');
            } catch (error) {
                alert("회원수정 실패");
            }
        } else {
            //alert("입력한 정보를 다시 확인해주세요.");
            checkNickname(nickName);
            checkPhone(phone);
            checkExistingPassword(existingPassword);
            checkNewPassword(newPassword);
            checkAddress(addressDetail);
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
                </div>
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
                                    nickName.length > 0 ? (isNickName ? "green" : "red") : "red",
                            }}
                        >
                            {nickNameMessage}
                        </p>
                    </span>
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
                                color: phone.length > 0 ? (isPhone ? "green" : "red") : "red",
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
                        <p style={{ color: "red" }}>{addressMessage}</p>
                    </span>
                </div>
                <div className="my-[20px]">
                    <div className="text-header my-[10px] font-[600]">비밀번호</div>
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
                                    existingPassword.length > 0 ? (isExistingPassword ? "green" : "red") : "red",
                            }}
                        >
                            {existingPasswordMessage}
                        </p>
                    </span>
                </div>
                <div className="my-[20px]">
                    <div className="text-header my-[10px] font-[600]">새 비밀번호</div>
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
                                    newPassword.length > 0 ? (isNewPassword ? "green" : "red") : "red",
                            }}
                        >
                            {newPasswordMessage}
                        </p>
                    </span>
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
