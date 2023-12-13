'use client';
// ChatPage.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
// import Cookies from 'js-cookie';
import { withAuthorization } from '@/HOC/withAuthorization';
import { getCookie } from '@/api/Cookie';
import Header from '@/components/Header';
import Button from '@/components/Button';
import BottomFixed from '@/components/BottomFixed';

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
  exchangePostAddress: string;
  exchangePostCategory: string;
  exchangePostId: number;
  exchangePostImage: string;
  exchangePostTittle: string;
  userId: number;
  userName: string;
  userProfileImage: string;
  messages: [];
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

  let socket: any = null;
  const chatRoomId = params.id;

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  const onScroll = () => {
    const { scrollY } = window;
    console.log(scrollY);
    console.log(waitData);
    if (scrollY <= 20 && !waitData) {
      // alert('불러오는중');
      window.scrollTo(0, 1000);
      pagenation++;
      waitData = true;
      fetchChatHistory(pagenation); // 업데이트된 pagenation을 사용
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
        // .map((msg: any) => ({
        //   senderId: msg.senderId,
        //   content: msg.content,
        //   imageUrl: msg.imageUrl,
        //   createAt: formatDate(msg.createAt),
        //   isRead: msg.isRead,
        // }));

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
    const meessageOwner = message.senderId === parseInt(userIdValue);
    return (
      <div
        className={
          meessageOwner ? 'flex items-end justify-end' : 'flex items-end'
        }
      >
        <div className="flex">
          <div>
            {!meessageOwner && (
              <div className="flex">
                <div className="w-[20px] h-[20px] bg-black"></div>
                <div className="leading-none">{initRoom?.userName}</div>
              </div>
            )}
            <div className="bg-gray rounded-lg max-w-[260px]">
              {message.content}
            </div>
            <div className="text-xs text-gray ml-2 mb-1">
              Time: {message.createAt}
            </div>
            <div>{message.isRead && '읽음'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      <Header title="채팅"></Header>
      <div className="fixed w-full bg-white max-w-[480px]">
        <div className="text-header font-bold my-[10px]">
          교환하려고 하는 게시물
        </div>
        <div className="flex justify-between">
          <div className="w-[80px] h-[80px]">
            {/* <img src={initRoom?.exchangePostImage} /> */}
          </div>
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">
            <div>
              <div className="w-full text-ellipsis overflow-hidden text-title font-bold">
                {initRoom?.exchangePostTittle}
              </div>
              <div className="text-content text-gray">
                {initRoom?.exchangePostAddress}
              </div>
            </div>
            <div>{initRoom?.exchangePostCategory}</div>
          </div>
          <div className="w-[100px] text-center">
            <Button text="예약하기" height={5} rounded="soft"></Button>
          </div>
        </div>
      </div>
      <div className="h-[130px]"></div>

      <div className="chat-history">
        <ul className="flex-col flex">
          {messages.map((message, index) => (
            <MessageItem key={index} message={message} />
          ))}
        </ul>
      </div>
      <div ref={chatHistoryRef}></div>
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
