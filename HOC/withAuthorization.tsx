import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

// 인증 여부 및 권한 확인 로직을 수행하는 함수
const checkAuthorization = () => {
  alert('로그인 확인');
  // 여기에 권한 확인 로직을 추가
  // 예: 토큰이 유효한지, 특정 권한이 있는지 등을 확인
  // 이 함수가 true를 반환하면 권한이 있음을 의미
  return true;
};

export const withAuthorization = (
  WrappedComponent: any,
  requiredRoles: any
) => {
  const WithAuthorization = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // 권한 확인
      if (!checkAuthorization()) {
        // 권한이 없으면 다른 페이지로 이동 또는 에러 처리
        router.push('/login'); // 권한이 없는 경우 이동할 페이지
      }
    }, []);

    // 권한이 있으면 래핑된 컴포넌트를 반환
    return <WrappedComponent {...props} />;
  };

  return WithAuthorization;
};
