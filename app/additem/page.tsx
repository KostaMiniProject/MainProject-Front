'use client';
import { withAuthorization } from '@/HOC/withAuthorization';
import { postItem } from '@/apis/ItemApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import Modal from '@/components/Modal';
import TextAreaBox from '@/components/TextAreaBox';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { MdAddCircleOutline, MdCancel } from 'react-icons/md';

function Page() {
  const [title, setTitle] = useState<String>('');
  const [content, setContent] = useState<String>('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isMoreView, setIsMoreView] = useState<Boolean>(false);

  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const postid = searchParams.get('postId');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePostComplete = async () => {
    setShowModal(false);
    postComplete();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function handleMoreView() {
    setIsMoreView(!isMoreView);
  }
  function removeImage(index: number) {
    // 이미지 삭제
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setSelectedImages((prevImages) => {
      // 이전 이미지 배열에 새로운 이미지 배열을 추가
      // 현재 이미지 배열과 새로운 이미지 배열의 합이 5를 초과하면 슬라이스하여 최대 5개로 제한
      const newImages = [...prevImages, ...Array.from(files)];
      return newImages.length > 5 ? newImages.slice(0, 5) : newImages;
    });
  }

  async function postComplete() {
    if (selectedImages.length <= 0) {
      alert('사진을 1개 이상 등록 해 주세요');
    } else if (title.length <= 0) {
      alert('제목을 입력 해 주세요');
    } else if (content.length <= 0) {
      alert('상세 설명을 입력 해 주세요');
    } else {
      const formData = new FormData();

      // 기타 데이터를 JSON 형태로 FormData에 추가
      const postItemData = {
        title: title,
        description: content,
        category: '식품',
      };
      formData.append(
        'itemSaveDTO',
        new Blob([JSON.stringify(postItemData)], { type: 'application/json' })
      );

      // 이미지 파일을 FormData에 추가
      selectedImages.forEach((image) => {
        formData.append('file', image);
      });
      try {
        // 서버로 POST 요청 보내기
        await postItem(formData);
        console.log('Upload successful');
        handlePostingAfter();
      } catch (error) {
        console.error('Error uploading:', error);
        // 업로드 중 에러 발생 시 처리
      }
    }
  }
  function handlePostingAfter() {
    const postid = searchParams.get('postId');
    if (postid) {
      router.push(`/biding?postId=${postid}`);
    } else {
      router.back();
    }
  }
  function openFileInput() {
    // 파일 입력 엘리먼트를 클릭하여 파일 선택 다이얼로그 열기
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  return (
    <div className="mx-default">
      <Header backNav title="아이템 추가"></Header>
      <div
        className="bg-softbase flex px-[7px] py-[5px]"
        style={isMoreView ? {} : { height: '140px', overflow: 'hidden' }}
      >
        <div className="flex flex-wrap flex-1">
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative w-[120px] mx-[2px] my-[5px] h-[120px] overflow-hidden flex items-center justify-center border-base border-solid border-[1px] rounded-[10px]"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`Selected Image ${index + 1}`}
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
              <div
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => removeImage(index)}
              >
                <MdCancel size={30} color={'#e00685'} />
              </div>
            </div>
          ))}
          {selectedImages.length < 5 ? (
            <div
              className="relative w-[120px] m-[2px] my-[5px] h-[120px] overflow-hidden flex items-center justify-center border-base border-solid border-[1px] rounded-[10px] cursor-pointer"
              onClick={openFileInput}
            >
              <MdAddCircleOutline size={30} color={'#e00685'} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          onClick={handleMoreView}
          className="bg-base rounded-[5px] h-[120px] w-[60px] flex items-center justify-center cursor-pointer"
        >
          <div className="text-white">{isMoreView ? '▲' : '▼'}</div>
        </div>
      </div>
      <input
        id="fileInput" // 파일 입력 엘리먼트에 ID 추가
        type="file"
        multiple
        accept=".jpg, .png"
        onChange={handleFileChange}
        style={{ display: 'none' }} // 화면에 표시되지 않도록 함
      />
      <div>
        <div className="">
          <div className="my-[5px]">
            <div className="text-header font-[600] flex">제목</div>
            <InputBox onChange={setTitle} />
          </div>
          <div className="my-[5px]">
            <div className="text-header font-[600] flex">상세 설명</div>
            <TextAreaBox onChange={setContent}></TextAreaBox>
          </div>
          <div className="text-center my-[15px] cursor-pointer">
            <Button
              text="작성 완료"
              fontSize={20}
              height={8}
              rounded="soft"
              onClick={handleShowModal}
            />
          </div>
          {showModal && (
            <Modal setState={handleCloseModal}>
              <div className="my-[5px]">작성을 완료하시겠습니까?</div>
              <div className="flex place-content-between">
                <Button
                  text="작성완료"
                  onClick={handlePostComplete}
                  height={5}
                  rounded="soft"
                />
                <Button
                  text="취소"
                  onClick={handleCloseModal}
                  height={5}
                  rounded="soft"
                />
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
