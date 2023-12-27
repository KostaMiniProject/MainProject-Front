'use client';
import { withAuthorization } from '@/HOC/withAuthorization';
import {
  getCommunityPostDetail,
  postCommunityPost,
  putCommunityPost,
} from '@/apis/CommunityApi';
import { postItem } from '@/apis/ItemApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import Modal from '@/components/Modal';
import TextAreaBox from '@/components/TextAreaBox';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdCancel } from 'react-icons/md';
interface postType {
  commentCount: number;
  communityPostId: number;
  comments?: {
    commentId: number;
    content: string;
    isOwner: boolean;
    profile: {
      userId: number;
      name: string;
      imageUrl: string;
    };
    children: [];
  }[];
  communityPostStatus: string;
  content: string;
  date: string;
  imageUrl: [];
  isPressLike: boolean;
  likeCount: number;
  postOwner: boolean;
  title: string;
  user: {
    address: string;
    email: string;
    name: string;
    phone: string;
    profileImage: string;
    rating: number;
    userId: number;
  };
}
function Page({ params }: { params: any }) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isMoreView, setIsMoreView] = useState<Boolean>(false);
  const [post, setPost] = useState<postType>();

  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const postid = searchParams.get('postId');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getCommunityPostDetail(params.id);
        setPost(data);
        setTitle(data.title); // 데이터를 title 상태에 할당
        setContent(data.content); // 데이터를 content 상태에 할당
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    if (post?.imageUrl) {
      // 이미지 URL을 그대로 사용
      setSelectedImages(post.imageUrl);
    }
  }, [post]);

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
  function removeImage(index: any) {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  // function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const files = event.target.files;
  //   if (!files || files.length === 0) return;
  //   setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
  // }
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    // 새로 추가된 이미지만 File 객체로 관리
    setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
  }

  async function postComplete() {
    if (title.length <= 0) {
      alert('제목을 입력 해 주세요');
    } else if (content.length <= 0) {
      alert('상세 설명을 입력 해 주세요');
    } else {
      const formData = new FormData();

      // 기타 데이터를 JSON 형태로 FormData에 추가
      const images = selectedImages.filter(
        (image) => typeof image === 'string'
      );

      // 기타 데이터를 JSON 형태로 FormData에 추가
      const postItemData = {
        title: title,
        content: content,
        images: images,
      };
      formData.append(
        'communityPostUpdateDTO',
        new Blob([JSON.stringify(postItemData)], { type: 'application/json' })
      );

      // 이미지 파일을 FormData에 추가
      // selectedImages.forEach((image) => {
      //   formData.append('file', image);
      // });
      selectedImages.forEach((image) => {
        if (image instanceof File) {
          formData.append('file', image);
        }
      });
      console.log(selectedImages);
      try {
        // 서버로 POST 요청 보내기
        await putCommunityPost(formData, params.id);
        console.log('Upload successful');
        handlePostingAfter();
      } catch (error) {
        console.error('Error uploading:', error);
        // 업로드 중 에러 발생 시 처리
      }
    }
  }
  function handlePostingAfter() {
    router.forward();
    // const postid = searchParams.get('postId');
    // if (postid) {
    // } else {
    // router.back();
    // }
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
      <Header backNav title="게시글 작성"></Header>
      <div
        className="bg-softbase flex px-[7px] py-[5px]"
        style={isMoreView ? {} : { height: '140px', overflow: 'hidden' }}
      >
        <div className="flex flex-wrap flex-1">
          {selectedImages.map((image, index) => {
            const imageUrl =
              image instanceof File ? URL.createObjectURL(image) : image;
            return (
              <div
                key={index}
                className="relative w-[120px] mx-[2px] my-[5px] h-[120px] overflow-hidden flex items-center justify-center border-base border-solid border-[1px] rounded-[10px]"
              >
                <Image
                  src={imageUrl}
                  alt={`Selected Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority

                  // 기타 Image 컴포넌트 속성
                />
                <div
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => removeImage(index)}
                >
                  <MdCancel size={30} color={'#e00685'} />
                </div>
              </div>
            );
          })}
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
            <InputBox onChange={setTitle} content={title} />{' '}
            {/* title 상태 값을 사용 */}
          </div>
          <div className="my-[5px]">
            <div className="text-header font-[600] flex">내용</div>
            <TextAreaBox onChange={setContent} content={content} />{' '}
            {/* content 상태 값을 사용 */}
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
