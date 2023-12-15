'use client';
// page.tsx
import { withAuthorization } from '@/HOC/withAuthorization';
import { getChatRoomList } from '@/api/ChattingApi';
import Header from '@/components/Header';
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
      <Header title="채팅목록"></Header>
      <ul>
        {roomList?.map((room, index) => (
          <Link
            href={`/chatting/${room.chatRoomId}`}
            key={index}
            className="flex items-center rounded py-[5px] border-b-[0.5px] border-gray"
          >
            <img
              src={room.participantProfileImg}
              alt="Profile"
              className="w-[80px] h-[80px]"
            />
            <div>
              <div className="text-title">{room.participantName}</div>
              <div className="text-subtitle">{room.exchangePostAddress}</div>
              <div className="text-subtitle">{room.lastMessageContent}</div>
              <div className="text-subtitle text-gray">
                {room.lastMessageTimeDifference}
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
