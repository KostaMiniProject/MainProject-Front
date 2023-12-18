'use client';
import React, { useEffect, useState } from 'react';
import { withAuthorization } from '@/HOC/withAuthorization';
import Header from '@/components/Header';
import { getExchangePostsForMap } from '@/api/MapApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    kakao: any;
  }
}

function Page() {
  const [exchangePosts, setExchangePosts] = useState<any[]>([]); // 교환 게시글 목록 상태
  const markerImageSrc =
    '"https://d30zoz4y43tmi6.cloudfront.net/500/20231214150853292330f44-458c-aec6-6f4492d65371.png"'; // 마커 이미지 URL
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExchangePostsForMap();
        setExchangePosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log('Posts', exchangePosts);
    // 카카오 지도 API 스크립트 로드
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ba47a1aa03a301d0248147bf7b6d1d57&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(kakaoMapScript);
    // 교환 게시글 데이터 가져오기

    kakaoMapScript.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const locPosition = new window.kakao.maps.LatLng(lat, lon);
            const message = '<div style="padding:5px;">현재 위치</div>';
            displayMap(locPosition, message);
          });
        } else {
          const locPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          const message =
            'geolocation을 사용할 수 없어서 기본 위치를 불러왔습니다.';
          displayMap(locPosition, message);
        }
      });
    });
  }, [exchangePosts]);

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
    addMarkers(map);
  };

  // 지도에 마커 추가하는 함수
  const addMarkers = (map: any) => {
    exchangePosts.forEach((post) => {
      console.log('addMarker 진입');
      if (post.longitude && post.latitude) {
        const position = new window.kakao.maps.LatLng(
          post.latitude,
          post.longitude
        );
        console.log(position);
        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: position,
          // 이미지 사용을 원한다면 아래 주석을 해제하세요
          image: new window.kakao.maps.MarkerImage(
            post.imgUrl,
            new window.kakao.maps.Size(50, 50)
          ),
        });

        // 마커 클릭 이벤트: 필요한 경우에만 추가하세요
        window.kakao.maps.event.addListener(marker, 'click', () => {
          router.push(`/exchange/${post.exchangePostId}`);
        });
      }
    });
  };

  return (
    <div>
      <Header backNav title="지도 페이지"></Header>
      <div>
        <div className="my-[5px]">
          <div className="flex justify-between">
            <div
              className="map-container"
              style={{ width: '100vw', height: '100vh' }}
            >
              <div id="map" style={{ width: '100%', height: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
