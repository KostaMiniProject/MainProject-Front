'use client';
import { postCheckAuth } from '@/apis/CheckAuthApi';
import { token, userId } from '@/store/atoms';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function page() {
  const searchParams = useSearchParams();

  const [accessToken, setAccessToken] = useRecoilState(token);
  const [accessUserId, setAccessUserId] = useRecoilState(userId);
  const [accessUserEmail, setAccessUserEmail] = useState('');

  const router = useRouter();
  useEffect(() => {
    const data: string = searchParams.get('token') ?? '';
    const checkAuth = async () => {
      const body = {
        token: data,
      };
      try {
        const res: any = await postCheckAuth(body);
        setAccessToken(res.token);
        setAccessUserId(res.userId);
        setAccessUserEmail(res.userEmail);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  return <div>checkAuth</div>;
}

export default page;
