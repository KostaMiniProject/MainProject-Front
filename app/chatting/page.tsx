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
interface IMessage {
  senderId: number;
  content?: string;
  imageUrl?: string;
}

// 받는 메시지 인터페이스
interface IReceivedMessage {
  userId: number;
  userName: string;
  userProfileImage: string;
  text?: string;
  imageUrl?: string;
  isRead: boolean;
  createAt: string;
  messageType: string;
}

const ChatPage: React.FC = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<IReceivedMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userIdValue, setUserIdValue] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const chatRoomId = 1; // 예시 채팅방 ID

  useEffect(() => {
    const userId = getCookie('userId');
    const token = getCookie('token');
    if (userId) {
      setUserIdValue(userId);
    }
    if (token) {
      setToken(token);
    }

    const socket = new SockJS('https://itsop.shop/ws');
    const client = new Client({
      webSocketFactory: () => socket,
    });

    client.onConnect = () => {
      console.log('Connected!');

      // 채팅방의 기존 채팅 내역을 불러옵니다.
      // fetchChatHistory();

      // 새로운 채팅 메시지 구독
      client.subscribe(`/sub/chatroom/${chatRoomId}`, (message) => {
        //메세지 받을 때 로직
        if (message.body) {
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
      console.log(token); // 토큰 잘넘어오는지 확인
      const response = await axios.get(
        `https://itsop.shop/api/chatRooms/${chatRoomId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data); // 데이터 잘 넘어오는지 확인
        const chatHistory = response.data.map((msg: any) => ({
          userId: msg.userId,
          userName: msg.userName,
          userProfileImage: msg.userProfileImage,
          text: msg.text,
          imageUrl: msg.imageUrl,
          isRead: msg.isRead,
          createAt: msg.createAt,
          messageType: msg.messageType,
        }));
        setMessages(chatHistory);
      }
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  };

  const sendMessage = () => {
    console.log(token);
    console.log(userIdValue);
    if (stompClient && newMessage !== '') {
      const userId = userIdValue ? parseInt(userIdValue, 10) : 1; // 'userId' 값이 있으면 숫자로 변환, 없으면 1(임시 값)
      const message: IMessage = {
        senderId: userId,
        content: newMessage,
      };
      stompClient.publish({
        destination: `/pub/send`,
        body: JSON.stringify(message),
      });
      console.log('sendMessage end');
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
    <div style={styles.messageItem}>
      <div style={styles.userInfo}>
        <img
          src={message.userProfileImage}
          alt="User Profile"
          style={styles.profileImage}
        />
        <strong>{message.userName}</strong>
      </div>
      <div style={styles.messageContent}>
        {message.messageType === 'TEXT' ? (
          <p>{message.text}</p>
        ) : (
          <img
            src={message.imageUrl}
            alt="Chat Attachment"
            style={styles.chatImage}
          />
        )}
        <small>{formatDate(message.createAt)}</small>
        <small>{message.isRead ? 'Read' : 'Unread'}</small>
      </div>
    </div>
  );

  return (
    <div className="chat-page">
      <div className="chat-history">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <MessageItem message={message} />
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
};

export default withAuthorization(ChatPage, ['user']);

// 추가된 CSS 스타일을 객체 형태로 정의
const styles = {
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: 10,
  },
  messageItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  messageContent: {
    maxWidth: '70%',
  },
  chatImage: {
    maxWidth: '100%',
    height: 'auto',
  },
};
