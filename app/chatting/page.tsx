'use client';
// page.tsx
import { withAuthorization } from '@/HOC/withAuthorization';
import { getChatRoomList } from '@/api/ChattingApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Page() {
  const [roomList, setRoomList] = useState<any[] | undefined>();

  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const data: any[] = await getChatRoomList();
        setRoomList(data);
      } catch (error) {
        console.error('Error fetching exchange post data:', error);
      }
    };
    fetchRoomList();
  }, []);

  return (
    <div>
      <h1>Your Chat Rooms</h1>
      <ul>
        {roomList?.map((room, index) => (
          <Link
            href={`/chatting/${room.chatRoomId}`}
            key={index}
            className="flex items-center bg-gray-200 p-4 mb-4 rounded"
          >
            <img
              src={room.participantProfileImg}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p>Exchange Post Address: {room.exchangePostAddress}</p>
              <p>Last Message: {room.lastMessageContent}</p>
              <p>
                Last Message Time Difference: {room.lastMessageTimeDifference}
              </p>
              <p>Participant Name: {room.participantName}</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
