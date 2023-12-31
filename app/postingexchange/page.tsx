'use client';
import { withAuthorization } from '@/HOC/withAuthorization';
import { postExchangePost } from '@/apis/ExchangePostApi';
import { getItemById } from '@/apis/ItemApi';
import Button from '@/components/Button';
import Header from '@/components/Header';
import InputBox from '@/components/InputBox';
import Modal from '@/components/Modal';
import TextAreaBox from '@/components/TextAreaBox';
import Item, { itemType } from '@/components/item/Item';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface qaType {
  La: string;
  Ma: string;
}

function page() {
  const [title, setTitle] = useState<String>('');
  const [preferItems, setPreferItems] = useState<String>('');
  const [address, setAddress] = useState<String>('');
  const [content, setContent] = useState<String>('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<itemType>();
  const [edit, setEdit] = useState<number>(0);
  const [postNumber, setPostNumber] = useState<number>();
  const [openMap, setOpenMap] = useState<boolean>(true);
  const [qa, setQa] = useState<qaType>();
  const [mapAddress, setMapAddress] = useState();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlPath = usePathname();

  const handleShowModal = () => {
    if (title.length < 1) {
      alert('제목을 입력 해 주세요');
    } else if (content.length < 0) {
      alert('내용을 입력 해 주세요');
    } else {
      setShowModal(true);
    }
  };

  const handlePostComplete = async () => {
    setShowModal(false);
    postComplete();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ba47a1aa03a301d0248147bf7b6d1d57&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var mapContainer = document.getElementById('map');
        var mapOption = {
          center: new window.kakao.maps.LatLng(37.33886, 127.109316),
          level: 3,
        };

        var map = new window.kakao.maps.Map(mapContainer, mapOption);
        var geocoder = new window.kakao.maps.services.Geocoder();

        var marker = new window.kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
          infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              var lat = position.coords.latitude,
                lon = position.coords.longitude;
              var locPosition = new window.kakao.maps.LatLng(lat, lon);

              map.setCenter(locPosition);

              searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            },
            function (error) {
              console.error('Geolocation error: ' + error.message);
              searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            }
          );
        } else {
          console.log('Geolocation is not supported by this browser.');
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        }
        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          map,
          'click',
          function (mouseEvent: any) {
            searchDetailAddrFromCoords(
              mouseEvent.latLng,
              function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                  // console.log(result);
                  // console.log(mouseEvent.latLng);
                  setQa(mouseEvent.latLng);
                  setMapAddress(result[0].address.address_name);
                  // var detailAddr = !!result[0].road_address
                  //   ? '<div>도로명주소 : ' +
                  //     result[0].road_address.address_name +
                  //     '</div>'
                  //   : '';
                  // detailAddr +=
                  //   '<div>지번 주소 : ' +
                  //   result[0].address.address_name +
                  //   '</div>';

                  // var content =
                  //   '<div class="bAddr">' +
                  //   '<span class="title">법정동 주소정보</span>' +
                  //   detailAddr +
                  //   '</div>';

                  // 마커를 클릭한 위치에 표시합니다
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  // infowindow.setContent(content);
                  // infowindow.open(map, marker);
                }
              }
            );
          }
        );

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'idle', function () {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords: any, callback: any) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords: any, callback: any) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            var infoDiv = document.getElementById('centerAddr');

            for (var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H' && infoDiv) {
                infoDiv.innerHTML = result[i].address_name;
                break;
              }
            }
          }
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);
  function handleOpenMap() {
    setOpenMap(!openMap);
  }
  async function postComplete() {
    let data: any;
    if (selectedItem) {
      data = {
        itemId: searchParams.get('selectedItems'),
        title: title,
        preferItems: preferItems,
        content: content,
      };
      if (openMap && qa) {
        data = {
          ...data,
          address: mapAddress,
          La: qa.La,
          Ma: qa.Ma,
        };
      }
      try {
        await postExchangePost(data);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data);
  }

  function selectItem() {
    router.push(urlPath + '/selectitem');
  }

  useEffect(() => {
    const selectedItemId = searchParams.get('selectedItems');
    if (selectedItemId) {
      try {
        // 2. getItemById 함수를 비동기로 호출하도록 수정
        getItemById(selectedItemId).then((parsedItem) => {
          setSelectedItem(parsedItem);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div>
      <Header backNav title="교환 게시글 작성"></Header>
      <div className="mx-[15px] bg-white">
        {/* Item 컴포넌트 사용 */}
        {selectedItem ? (
          <Item item={selectedItem} />
        ) : (
          <div>선택된 아이템이 없습니다.</div>
        )}
        <div className="text-center my-[15px]">
          <Button
            text={selectedItem ? '다른 물건 선택하기' : '물건 선택하기'}
            fontSize={20}
            height={8}
            rounded="soft"
            onClick={selectItem}
          />
        </div>
      </div>
      <div className="mx-[15px]">
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶제목</div>
          <InputBox onChange={setTitle} />
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶선호 물건</div>
          <InputBox onChange={setPreferItems} />
        </div>
        <div className="my-[5px]">
          <div className="text-[20px] font-[600] flex">▶상세 설명</div>
          <TextAreaBox onChange={setContent}></TextAreaBox>
        </div>
        <div className="my-[5px]">
          <div className="flex justify-between">
            <div className="text-[20px] font-[600] flex">▶거래 장소</div>
            <div className="flex" onClick={handleOpenMap}>
              <div>입력 하기</div>
              <input type="checkbox" checked={openMap} readOnly />
            </div>
          </div>
          <div
            className="w-full"
            style={openMap ? { height: '300px', overflow: 'hidden' } : {}}
          >
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>
        <div className="text-center my-[15px] z-20">
          <Button
            text="작성 완료"
            fontSize={20}
            height={8}
            rounded="soft"
            onClick={handleShowModal}
          />
        </div>
      </div>
      {showModal && (
        <Modal setState={handleCloseModal}>
          <div className="my-[5px]">글을 등록 하시겠습니까?</div>
          <div className="flex place-content-between">
            <Button
              text="등록"
              onClick={handlePostComplete}
              height={5}
              rounded="soft"
            />
            <Button
              text="취소"
              onClick={handleCloseModal}
              height={5}
              rounded="soft"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default withAuthorization(page, ['user']);
