import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Palette } from "../constants/palette";

type VerifyVisitProps = {
    verifyLocation: VerifyLocationType
};

type VerifyLocationType = {
    latitude: number;
    longitude: number;
    bin_lat: number;
    bin_lng: number;
  }

const VerifyVisit = ({ verifyLocation }: VerifyVisitProps) => {
  const {latitude, longitude, bin_lat, bin_lng} = verifyLocation;
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [currentMarker, setCurrentMarker] = useState<kakao.maps.Marker | null>(null);
  const [binMarker, setBinMarker] = useState<kakao.maps.Marker | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [isWithin50m, setIsWithin50m] = useState<boolean | null>(null);

  const initMap = () => {
    const container = document.getElementById('verifyVisitMap');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const currentImageSrc = "image/Current.svg";
    const binImageSrc = "image/targetMarker.svg"; // 쓰레기통 마커 이미지
    const imageSize = new window.kakao.maps.Size(30, 30);
    const imageOption = { offset: new window.kakao.maps.Point(15, 15) };
    const currentImage = new window.kakao.maps.MarkerImage(currentImageSrc, imageSize, imageOption);
    const binImage = new window.kakao.maps.MarkerImage(binImageSrc, imageSize, imageOption);

    const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const binPosition = new window.kakao.maps.LatLng(bin_lat, bin_lng);

    const myMarker = new window.kakao.maps.Marker({
      position: currentPosition,
      image: currentImage,
      zIndex: 2,
    });

    const myBinMarker = new window.kakao.maps.Marker({
      position: binPosition,
      image: binImage,
      zIndex: 1,
    });

    const map = new window.kakao.maps.Map(container as HTMLElement, options);
    (mapRef as MutableRefObject<kakao.maps.Map | null>).current = map;
    myMarker.setMap(map);
    myBinMarker.setMap(map);
    setBinMarker(myBinMarker);
    setCurrentMarker(myMarker);
    setIsMapLoaded(true);

    // 50m 반경의 노란색 원을 쓰레기통 주변에 표시
    const circle = new window.kakao.maps.Circle({
      center: binPosition,
      radius: 50, // 반경 50미터
      strokeWeight: 2,
      strokeColor: '#FFD700',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
      fillColor: '#FFD700',
      fillOpacity: 0.3,
    });
    circle.setMap(map);

    // 거리 계산 및 설정
    const poly = new window.kakao.maps.Polyline({
      path: [currentPosition, binPosition],
    });
    const calculatedDistance = poly.getLength(); // 미터 단위 거리 계산

    // 현재 위치가 50m 반경 내에 있는지 확인 및 상태 설정
    checkProximity(calculatedDistance);
  };

  const checkProximity = (calculatedDistance: number) => {
    const within50m = calculatedDistance <= 50;
    if (within50m !== isWithin50m) {
      setIsWithin50m(within50m);
      sendMessageToRN(within50m);
    }
  };

  const sendMessageToRN = (within50m: boolean) => {
    const message = JSON.stringify({
      type: "proximity",
      payload: {
        within50m: within50m,
      },
    });
    window.ReactNativeWebView?.postMessage(message);
  };

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, []);

  useEffect(() => {
    if (mapRef.current && isMapLoaded && currentMarker) {
      const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
      currentMarker.setPosition(currentPosition);
    //   mapRef.current.setCenter(currentPosition);

      if (binMarker) {
        const binPosition = new window.kakao.maps.LatLng(bin_lat, bin_lng);
        const poly = new window.kakao.maps.Polyline({
          path: [currentPosition, binPosition],
        });
        const calculatedDistance = poly.getLength();

        // 현재 위치가 50m 반경 내에 있는지 확인 및 상태 설정
        checkProximity(calculatedDistance);
      }
    }
  }, [latitude, longitude, isMapLoaded]);

  return (
    <div id="verifyVisitMap" style={{ width: "100vw", height: "100vh", background: Palette.Gray1 }}></div>
  );
};

export default VerifyVisit;
