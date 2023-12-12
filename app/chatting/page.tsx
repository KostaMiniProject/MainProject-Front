'use client';
import { withAuthorization } from '@/HOC/withAuthorization';
import { getChatRoomList } from '@/api/ChattingApi';
import React, { useEffect, useState } from 'react';

function page() {
  const [roomList, setRoomList] = useState();
  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const data: any = await getChatRoomList();
        console.log(data);
        setRoomList(data);
      } catch (error) {
        console.error('Error fetching exchange post data:', error);
      }
    };
    fetchRoomList();
  }, []);

  useEffect(() => {
    console.log(roomList);
  }, [roomList]);
  return <div>page</div>;
}

export default withAuthorization(page, ['user']);
