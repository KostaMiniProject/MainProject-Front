import { getCookie } from '@/api/Cookie';
import { isToken, token } from '@/store/atoms';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// 인증 여부 및 권한 확인 로직을 수행하는 함수
function checkAuthorization(isLogin: boolean) {
  // 권한 확인 로직을 추가
  // 예: 토큰이 유효한지, 특정 권한이 있는지 등을 확인
  // 이 함수가 true를 반환하면 권한이 있음을 의미
  return isLogin; // 예시로 현재는 isLogin 값을 그대로 반환하도록 함
}

export function withAuthorization(WrappedComponent: any, requiredRoles: any) {
  function WithAuthorization(props: any) {
    const router = useRouter();
    const [accessToken, setAccessToken] = useRecoilState(token);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const storedToken: string | undefined = getCookie('token');

      if (storedToken) {
        setAccessToken(storedToken);
        // 권한 확인 로직 추가 (현재는 checkAuthorization에서 isLogin 값을 반환)
        // const hasAuthorization = checkAuthorization(isLogin);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        // 토큰이 없을 경우 로그인 페이지로 리다이렉트
        router.push('/login');
      }
    }, [router, setAccessToken]);

    if (isLoading) {
      // 로딩 중일 때 로딩 상태를 표시하거나 아무것도 렌더링하지 않음
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  }

  return WithAuthorization;
}
