import React from 'react';
interface AddressInfo {
  zcode: string;
  roadAddr: string;
  jibunAddr: string;
  detailAddr: string;
}

interface Props {
  info: AddressInfo;
  setInfo: React.Dispatch<React.SetStateAction<AddressInfo>>;
}

export const PostCode = ({ info, setInfo }: Props): void => {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  // 스크립트가 이미 로드되었는지 확인합니다.
  if (!(window as any).daum) {
    // 로드되지 않았다면 동적으로 스크립트를 문서에 추가합니다.
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      // 스크립트가 로드된 후에 다음 우편번호 API를 엽니다.
      new (window as any).daum.Postcode({
        oncomplete: function (data: any) {
          const zcode_: string = data.zonecode;
          const roadAddr_: string = data.roadAddress;
          const jibunAddr_: string = data.jibunAddress;
          setInfo({
            ...info,
            roadAddr: roadAddr_,
            zcode: zcode_,
            jibunAddr: jibunAddr_,
          });
        },
      }).open();
    };
    document.body.appendChild(script);
  } else {
    // 스크립트가 이미 로드된 경우에는 직접 다음 우편번호 API를 엽니다.
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        const zcode_: string = data.zonecode;
        const roadAddr_: string = data.roadAddress;
        const jibunAddr_: string = data.jibunAddress;
        setInfo({
          ...info,
          roadAddr: roadAddr_,
          zcode: zcode_,
          jibunAddr: jibunAddr_,
        });
      },
    }).open();
  }
};

export default PostCode;
