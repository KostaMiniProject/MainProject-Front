import { useEffect, useState } from 'react';

interface WindowSize {
  width?: number;
  height?: number;
}

const useWindowSizeCustom = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // 초기값 설정

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      // For server-side rendering (SSR)
      // Cleanup function for the case when window is undefined
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  return windowSize;
};

export default useWindowSizeCustom;
