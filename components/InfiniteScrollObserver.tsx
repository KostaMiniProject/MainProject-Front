'use client';
import React, { useEffect, useRef } from 'react';

function InfiniteScrollObserver({
  onIntersect,
  hasMoreData,
}: {
  onIntersect: any;
  hasMoreData: any;
}) {
  const listEndRef = useRef(null);

  useEffect(() => {
    if (!hasMoreData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '0px', threshold: 1 }
    );

    if (listEndRef.current) {
      observer.observe(listEndRef.current);
    }

    return () => {
      if (listEndRef.current) {
        observer.unobserve(listEndRef.current);
      }
    };
  }, [listEndRef, hasMoreData, onIntersect]);

  return <div ref={listEndRef}></div>;
}

export default InfiniteScrollObserver;
