'use client';
import { Socket } from 'socket.io-client';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Page: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    // 서버의 WebSocket 엔드포인트에 연결
    const newSocket = io('http://localhost:8080/chat');
    setSocket(newSocket);

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // 새로운 메시지를 받았을 때의 이벤트 리스너
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      // 서버로 메시지 전송
      socket.emit('sendMessage', { content: newMessage, sender: 'User' });
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.sender}:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Page;
