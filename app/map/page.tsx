'use client';
import React, { useEffect, useState } from 'react';
import { withAuthorization } from '@/HOC/withAuthorization';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Item, { itemType } from '@/components/item/Item';
// import { postExchangePost, getItemById } from '@/api'; // API 호출 함수들

declare global {
  interface Window {
    kakao: any;
  }
}

function Page() {
  const [openMap, setOpenMap] = useState<boolean>(true);


  useEffect(() => {
    // 카카오 지도 API 스크립트 로드
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ba47a1aa03a301d0248147bf7b6d1d57&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locPosition = new window.kakao.maps.LatLng(lat, lon);
            const message = '<div style="padding:5px;">여기에 계신가요?!</div>';
            displayMap(locPosition, message);
          });
        } else {
          const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
          const message = 'geolocation을 사용할 수 없어요..';
          displayMap(locPosition, message);
        }
      });
    });
  }, []);

  // 지도와 마커를 표시하는 함수
  const displayMap = (locPosition: any, message: string) => {
    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: locPosition,
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
    });
    const infowindow = new window.kakao.maps.InfoWindow({
      content: message,
      removable: true,
    });
    infowindow.open(map, marker);
    map.setCenter(locPosition);
  };

  const handleOpenMap = () => {
    setOpenMap(!openMap);
  };

  return (
    <div>
      <Header backNav title="지도 페이지"></Header>
      <div className="mx-[15px]">
        <div className="my-[5px]">
          <div className="flex justify-between">
            <div className="text-[20px] font-[600]">장소</div>

          </div>
          <div
            style={openMap ? { height: '300px', overflow: 'hidden' } : {}}
          >
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
