'use client';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { withAuthorization } from '@/HOC/withAuthorization';

interface IMessage {
  senderId: number;
  content: string;
  chatRoomId: number;
}

const Page: React.FC = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const socket = new SockJS('https://itsop.shop/ws');
    const client = new Client({
      webSocketFactory: () => socket,
    });

    client.onConnect = () => {
      console.log('Connected!');
      client.subscribe('/sub/messages', (message) => {
        if (message.body) {
          const receivedMessage: IMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      });
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && newMessage.trim() !== '') {
      const message: IMessage = {
        senderId: 3,
        content: newMessage,
        chatRoomId: 1,
      };
      stompClient.publish({
        destination: '/pub/send',
        body: JSON.stringify(message),
      });
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.senderId}:</strong> {message.content}
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

export default withAuthorization(Page, ['admin']);
