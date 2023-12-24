'use client';
import { postCheckAuth } from '@/apis/CheckAuthApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function page() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>();
  useEffect(() => {
    const data: string = searchParams.get('token') ?? '';
    setToken(data);
  }, []);
  useEffect(() => {
    const checkAuth = async () => {
      const body = {
        token: token,
      };
      try {
        const res = await postCheckAuth(body);
      } catch (error) {
        console.log(error);
      }
    };
  }, [token]);
  return <div>checkAuth</div>;
}

export default page;
