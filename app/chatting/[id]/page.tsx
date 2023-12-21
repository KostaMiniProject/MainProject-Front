'use client';
// ChatPage.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
// import Cookies from 'js-cookie';
import { withAuthorization } from '@/HOC/withAuthorization';
import { getCookie } from '@/apis/Cookie';
import Header from '@/components/Header';
import Button from '@/components/Button';
import BottomFixed from '@/components/BottomFixed';
import Modal from '@/components/Modal';
import {
  deleteChattingRoom,
  putExchange,
  putExchangeComplete,
} from '@/apis/ChattingApi';
import { MdExitToApp } from 'react-icons/md';
import { useRouter } from 'next/navigation';

// 보내는 메시지 인터페이스
interface IReceivedMessage {
  chatId: number;
  senderId: number;
  content?: string;
  imageUrl?: string;
  createAt: string;
  isRead: boolean;
}

interface ISendMessage {
  roomId: number;
  senderId: number;
  content?: string;
  imageUrl?: string;
}

// 받는 메시지 인터페이스
interface IRoomMessages {
  isOwner: boolean;
  bidId: number;
  exchangePostAddress: string;
  exchangePostCategory: string;
  exchangePostId: number;
  exchangePostImage: string;
  exchangePostTittle: string;
  userId: number;
  userName: string;
  userProfileImage: string;
  messages: [];
  status: string;
}

function Page({ params }: { params: any }) {
  const testUrl = 'https://itsop.shop'; //http://localhost:8080
  // const testUrl = 'http://localhost:8080'; //http://localhost:8080

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<IReceivedMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userIdValue, setUserIdValue] = useState('');
  const [token, setToken] = useState<string>('');
  const [initRoom, setInitRoom] = useState<IRoomMessages>();
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const [callData, setCallData] = useState(false);
  let waitData = false;
  let pagenation = 0;
  // const [pagenation, setPagenation] = useState(0);
  const [scroll, setScroll] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  showCompleteModal;
  const route = useRouter();

  let socket: any = null;
  const chatRoomId = params.id;

  //예약하기 모달 핸들
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePostComplete = async () => {
    if (initRoom) {
      try {
        putExchange(initRoom?.exchangePostId, initRoom?.bidId);
        setInitRoom((prev: any) => ({ ...prev, status: 'EXCHANGE' }));
      } catch (error) {
        console.log(error);
      }
    }
    setShowModal(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  //거래완료 모달 핸들
  const handleShowCompleteModal = () => {
    setShowCompleteModal(true);
  };

  const handlePostCompleteExchange = async () => {
    if (initRoom) {
      try {
        putExchangeComplete(initRoom?.exchangePostId, initRoom?.bidId);
        setInitRoom((prev: any) => ({ ...prev, status: 'COMPLETE' }));
      } catch (error) {
        console.log(error);
      }
    }
    setShowCompleteModal(false);
  };
  const handleCloseCompleteModal = () => {
    setShowCompleteModal(false);
  };

  //나가기 모달 핸들
  const handleCloseExitModal = () => {
    setShowExitModal(false);
  };

  const handleShowExitModal = () => {
    setShowExitModal(true);
  };

  const handleExitComplete = async () => {
    if (initRoom) {
      try {
        handleExitChatting();
      } catch (error) {
        console.log(error);
      }
    }
    setShowExitModal(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  const onScroll = async () => {
    const { scrollY } = window;
    // console.log(scrollY);
    // console.log(waitData);
    if (scrollY <= 20 && !waitData) {
      // alert('불러오는중');
      const scrollHeight = window.innerHeight;
      console.log(scrollHeight);
      pagenation++;
      waitData = true;
      await fetchChatHistory(pagenation); // 업데이트된 pagenation을 사용
      window.scrollTo(0, window.innerHeight - scrollHeight);
    } else {
      setScroll('');
    }
  };

  useEffect(() => {
    chatHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    waitData = false;
  }, [messages]);
  useEffect(() => {
    const userId = getCookie('userId');
    // const token = getCookie('Authorization');
    const token = getCookie('token');
    if (userId) {
      setUserIdValue(userId);
    }
    if (token) {
      setToken(token);
    }

    if (!socket) {
      socket = new SockJS(`${testUrl}/ws`);
    }
    const client = new Client({
      webSocketFactory: () => socket,
    });

    client.onConnect = () => {
      console.log('Connected!');

      // 채팅방의 기존 채팅 내역을 불러옵니다.
      fetchChatHistory();

      // 새로운 채팅 메시지 구독
      client.subscribe(`/sub/chatroom/${chatRoomId}`, (message) => {
        //메세지 받을 때 로직
        if (message.body) {
          const myId = getCookie('userId');
          const parsedMessage = JSON.parse(message.body);

          if (parsedMessage.senderId) {
            console.log('메세지수신');
            // 새로운 메시지를 받았을 때
            const receivedMessage: IReceivedMessage = parsedMessage;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            if (myId)
              if (!(receivedMessage.senderId === parseInt(myId))) {
                console.log('상대방 메세지를 읽음');
                if (client) {
                  const body = {
                    chatId: receivedMessage.chatId,
                  };
                  console.log('상대방 메세지읽음을 보냄');

                  // 서버에 메시지 읽음 상태 변경을 알림
                  client.publish({
                    destination: `/pub/read`,
                    body: JSON.stringify(body),
                  });
                }
              }
          } else {
            // 메시지 읽음 상태 변경을 클라이언트에서도 반영
            const readMessage = JSON.parse(message.body);
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.chatId === readMessage.chatId
                  ? { ...msg, isRead: true }
                  : msg
              )
            );
            if (myId)
              setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                  msg.senderId === parseInt(myId)
                    ? { ...msg, isRead: true }
                    : msg
                )
              );
          }

          //콘솔로그
        }
      });
    };
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [chatRoomId]);

  async function fetchChatHistory(page: number = 0) {
    console.log('데이터 호출');
    // setCallData(true);
    waitData = true;

    try {
      console.log('fetchChatHistory : ' + token);

      const response = await axios
        .get(`${testUrl}/api/chatRooms/${chatRoomId}?page=${page}`, {
          headers: {
            Authorization: `${getCookie('token')}`,
          },
        })
        .finally(() => {
          console.log('호출완료');
          // setCallData(false);
        });

      if (response.status === 200) {
        setInitRoom(response.data);
        console.log(response.data);

        setTimeout(() => {
          waitData = false;
        }, 1000);
        const chatHistory = response.data.messages.reverse().map((msg: any) => {
          const myId = getCookie('userId');
          if (msg.senderId !== myId) {
            return {
              senderId: msg.senderId,
              content: msg.content,
              imageUrl: msg.imageUrl,
              createAt: formatDate(msg.createAt),
              isRead: true,
            };
          }
          return {
            senderId: msg.senderId,
            content: msg.content,
            imageUrl: msg.imageUrl,
            createAt: formatDate(msg.createAt),
            isRead: msg.isRead,
          };
        });

        if (chatHistory.length === 0) {
          setMessages(chatHistory);
        } else {
          setMessages((prevMessages) => [...chatHistory, ...prevMessages]);
        }
      }
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  }

  function sendMessage() {
    if (stompClient && newMessage !== '') {
      const userId = userIdValue ? parseInt(userIdValue, 10) : 1; // 'userId' 값이 있으면 숫자로 변환, 없으면 1(임시 값)
      const message: ISendMessage = {
        roomId: chatRoomId,
        senderId: userId,
        content: newMessage,
      };
      stompClient.publish({
        destination: `/pub/send`,
        body: JSON.stringify(message),
      });
      console.log('sendMessage end');
      console.log(message);
      setNewMessage('');
    }
  }
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  }

  // 메시지 렌더링을 위한 컴포넌트
  function MessageItem({ message }: { message: IReceivedMessage }) {
    const messageOwner = message.senderId === parseInt(userIdValue);
    return (
      <div
        className={
          messageOwner
            ? 'flex items-end justify-end my-[5px]'
            : 'flex items-end my-[5px]'
        }
      >
        <div className="flex">
          <div
            className={
              messageOwner ? 'flex-col flex items-end' : 'flex-col flex '
            }
          >
            {!messageOwner && (
              <div className="flex">
                <div className="w-[20px] h-[20px] bg-black rounded-[50%]"></div>
                <div className="leading-none text-subtitle flex flex-col justify-center mx-[5px]">
                  {initRoom?.userName}
                </div>
              </div>
            )}
            <div className=" max-w-[260px] flex items-end">
              <span className="bg-base text-header rounded-[8px] p-[3px] text-white my-[5px]">
                {message.content}
              </span>
            </div>

            <div className="text-subtitle text-gray">
              {!messageOwner
                ? `${message.createAt} ${message.isRead && '-읽음'}`
                : `${message.isRead && '읽음-'} ${message.createAt}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
  const handleExitChatting = async () => {
    try {
      await deleteChattingRoom(params.id);
      route.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat-page">
      <Header backNav title="채팅">
        <div onClick={handleShowExitModal}>
          <MdExitToApp size={40} />
        </div>
      </Header>
      {showExitModal && (
        <Modal setState={handleCloseExitModal}>
          <div className="my-[5px]">채팅방을 나가시겠습니까?</div>
          <div className="flex place-content-between">
            <Button
              text="나가기"
              onClick={handleExitComplete}
              height={5}
              rounded="soft"
            />
            <Button
              text="취소"
              onClick={handleCloseExitModal}
              height={5}
              rounded="soft"
            />
          </div>
        </Modal>
      )}
      <div className="fixed w-full bg-white max-w-[480px] pr-[16px]">
        <div className="text-header font-bold my-[10px]">
          교환하려고 하는 게시물
        </div>
        <div className="flex ">
          <div className="w-[80px] h-[80px] flex ">
            <img src={initRoom?.exchangePostImage} />
          </div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden  flex justify-between w-full">
            <div>
              <div className="w-full text-ellipsis overflow-hidden text-title font-bold">
                {initRoom?.exchangePostTittle}
              </div>
              <div className="text-content text-gray">
                {initRoom?.exchangePostAddress}
              </div>
              <div>{initRoom?.exchangePostCategory}</div>
            </div>
            <div className="w-[100px] text-center">
              {initRoom &&
                initRoom.isOwner &&
                (initRoom.status === 'BIDDING' ? (
                  <Button
                    text="예약하기"
                    height={5}
                    rounded="soft"
                    onClick={handleShowModal}
                  ></Button>
                ) : initRoom.status === 'RESERVATION' ? (
                  <Button
                    text="거래완료"
                    height={5}
                    rounded="soft"
                    onClick={handleShowCompleteModal}
                  ></Button>
                ) : (
                  <Button
                    text="거래완료"
                    height={5}
                    rounded="soft"
                    btnStyle="disable"
                  ></Button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[130px]"></div>
      <div className="mx-default">
        <ul className="flex-col flex">
          {messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))}
        </ul>
      </div>
      <div ref={chatHistoryRef}></div>
      {showModal && (
        <Modal setState={handleCloseModal}>
          <div className="my-[5px]">예약 하시겠습니까?</div>
          <div className="flex place-content-between">
            <Button
              text="예약하기"
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
      {showCompleteModal && (
        <Modal setState={handleCloseCompleteModal}>
          <div className="my-[5px]">거래를 완료 하시겠습니까?</div>
          <div className="flex place-content-between">
            <Button
              text="거래완료"
              onClick={handlePostCompleteExchange}
              height={5}
              rounded="soft"
            />
            <Button
              text="취소"
              onClick={handleCloseCompleteModal}
              height={5}
              rounded="soft"
            />
          </div>
        </Modal>
      )}
      <BottomFixed>
        <div className="flex justify-between w-full h-[40px] bg-white">
          <input
            type="text"
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </BottomFixed>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
