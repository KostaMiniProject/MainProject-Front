'use client';
// ChatPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
// import Cookies from 'js-cookie';
import { withAuthorization } from '@/HOC/withAuthorization';
import { getCookie } from '@/api/Cookie';

// 보내는 메시지 인터페이스
interface IReceivedMessage {
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
  userId: number;
  userName: string;
  userProfileImage: string;
  messages: [];
}

function Page({ params }: { params: any }) {
  const testUrl = 'https://itsop.shop'; //http://localhost:8080
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<IReceivedMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userIdValue, setUserIdValue] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const chatRoomId = params.id;

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

    const socket = new SockJS(`${testUrl}/ws`);
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
          //콘솔로그

          const receivedMessage: IReceivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [chatRoomId]);

  const fetchChatHistory = async () => {
    try {
      console.log('fetchChatHistory : ' + token); // 토큰 잘넘어오는지 확인
      const response = await axios.get(
        `${testUrl}/api/chatRooms/${chatRoomId}`,
        {
          headers: {
            Authorization: `${getCookie('token')}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data); // 데이터 잘 넘어오는지 확인
        const chatHistory = response.data.messages.map((msg: any) => ({
          senderId: msg.senderId,
          content: msg.content,
          imageUrl: msg.imageUrl,
          createAt: formatDate(msg.createAt),
          isRead: msg.isRead,
        }));
        setMessages(chatHistory);
      }
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  };

  const sendMessage = () => {
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
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  };

  // 메시지 렌더링을 위한 컴포넌트
  const MessageItem = ({ message }: { message: IReceivedMessage }) => (
    <div>
      <div>Time: {message.createAt}</div>
    </div>
  );

  return (
    <div className="chat-page">
      <div className="chat-history">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {message.senderId === parseInt(userIdValue) ? (
                <div>나:{message.content}</div>
              ) : (
                <div> 상대:{message.content}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
