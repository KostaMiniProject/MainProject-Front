'use client';
import React, { useEffect, useState } from 'react';
import { withAuthorization } from '@/HOC/withAuthorization';
import Header from '@/components/Header';
import { getExchangePostsForMap } from '@/api/MapApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

declare global {
  interface Window {
    kakao: any;
  }
}
const styleObj = {
  color: 'yellow',
  backgroundColor: 'black',
};

function Page() {
  const [exchangePosts, setExchangePosts] = useState<any[]>([]); // 교환 게시글 목록 상태
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const router = useRouter();

  useEffect(() => {
    async function fetchLocationAndData() {
      const fetchWithLocation = async (latitude:any, longitude:any) => {
        try {
          const data = await getExchangePostsForMap(longitude.toString(), latitude.toString());
          setExchangePosts(data); // 서버로부터 받은 데이터를 상태에 저장
        } catch (error) {
          console.error('Error fetching exchange posts:', error);
        }
      };
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          await fetchWithLocation(lat, lon);
        }, async (error) => {
          console.error('Error getting location:', error);
          // Geolocation을 사용할 수 없는 경우 하드코딩된 위치(오리역) 사용
          const defaultLat = 37.338860;
          const defaultLon = 127.109316;
          await fetchWithLocation(defaultLat, defaultLon);
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
        // 브라우저가 Geolocation을 지원하지 않는 경우 하드코딩된 위치(오리역) 사용
        const defaultLat = 37.338860;
        const defaultLon = 127.109316;
        await fetchWithLocation(defaultLat, defaultLon);
      }
    }
  
    fetchLocationAndData();
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
      // function makeOverListener(map: any, marker: any, infowindow: any) {
      //   return function () {
      //     infowindow.open(map, marker);
      //   };
      // }

      // // 인포윈도우를 닫는 클로저를 만드는 함수입니다
      // function makeOutListener(infowindow: any) {
      //   return function () {
      //     infowindow.close();
      //   };
      // }
      console.log('addMarker 진입');
      if (post.longitude && post.latitude) {
        const position = new window.kakao.maps.LatLng(
          post.latitude,
          post.longitude
        );
        console.log(position);
        // 마커 생성
        // 인포윈도우
        // const message = `<img width="150" height="150" src="${post.imgUrl}"/>`;
        // const infowindow = new window.kakao.maps.InfoWindow({
        //   content: message,
        //   removable: true,
        // });

        //커스텀 오버레이
        // const imgContent = `<img class="customOverlay" src="${post.imgUrl}" style="width: 50px; height: 50px;"/>`;
        // const imgContent = `<Image src=${post.imgUrl} width={50} height={50}/>`;
        const imgContent = `<div style="width: 50px; height: 50px;"><img src="${post.imgUrl}" style="width: 50px; height: 50px;"/></div>`;
        // const imgContent = `<div>asdfasdf</div>`;
        let customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          clickable: true,
          content: imgContent,
          position: position,
          xAnchor: 0.5,
          yAnchor: 1.8,
          zIndex: 3,
        });
        // console.log(customOverlay);

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: position,
          // 이미지 사용을 원한다면 아래 주석을 해제하세요
          // image: new window.kakao.maps.MarkerImage(
          //   post.imgUrl,
          //   new window.kakao.maps.Size(50, 50)
          // ),
        });
        // infowindow.open(map, marker);
        customOverlay.setMap(map);
        // 마커 클릭 이벤트: 필요한 경우에만 추가하세요

        // window.kakao.maps.event.addListener(
        //   marker,
        //   'mouseover',
        //   makeOverListener(map, marker, infowindow)
        // );
        // window.kakao.maps.event.addListener(
        //   marker,
        //   'mouseout',
        //   makeOutListener(infowindow)
        // );
        window.kakao.maps.event.addListener(marker, 'click', () => {
          router.push(`/exchange/${post.exchangePostId}`);
        });
      }
    });
  };
  // 교환 게시글 목록을 표시하는 함수
  const renderExchangePostList = () => {
    return exchangePosts.map((post) => (
      <div key={post.exchangePostId} className="post-item" onClick={() => router.push(`/exchange/${post.exchangePostId}`)}>
        <div className="post-image">
          {post.imgUrl && (
            <img src={post.imgUrl} alt={post.title} style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
          )}
        </div>
        <div className="post-info">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>{post.price}</p>
        </div>
      </div>
    ));
  };




  return (
    <div>
      <Header backNav title="지도 페이지"></Header>
      <div className="mx-[15px]">
        <div className="my-[5px]">
          <div className="flex justify-between">
            <div className="map-container" style={{ width: '100vw', height: '100vh' }}>
              <div id="map" style={{ width: '100%', height: '100%' }}></div>
            </div>
            <div className={`slide-up-panel ${isPanelOpen ? 'open' : ''}`}>
              <button className="toggle-button" onClick={togglePanel}>
                {isPanelOpen ? 'Close' : 'Open'}
              </button>
              <div className='contents'>

                {renderExchangePostList()}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default withAuthorization(Page, ['user']);
