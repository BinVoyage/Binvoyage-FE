import { useRef, MutableRefObject, useState, useEffect } from "react";
import { Palette } from "../constants/palette";

type ReportNewBinProps = {
    latitude: number;
    longitude: number;
}

const ReportNewBin = ({latitude, longitude}: ReportNewBinProps) => {
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const [, setIsMapLoaded] = useState<boolean>(false);
    const [, setCurrentMarker] = useState<kakao.maps.Marker | null>(null);
    let targetMarker: kakao.maps.Marker | null = null;

    const initMap = () => {
        const container = document.getElementById('reportNewBin');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
    
        const map = new window.kakao.maps.Map(container as HTMLElement, options);
        (mapRef as MutableRefObject<kakao.maps.Map | null>).current = map;
    
        setIsMapLoaded(true);

        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
            const clickPosition = mouseEvent.latLng;

            // 기존 targetMarker가 있으면 삭제
            if (targetMarker) {
                targetMarker.setMap(null);
            }

            const imageSrc = "image/reportNewBin/targetMarker.png";
            const imageSize = new window.kakao.maps.Size(35, 47);

            // 새로운 마커 생성
            const newMarker = new window.kakao.maps.Marker({
                position: clickPosition,
                image: new window.kakao.maps.MarkerImage(imageSrc, imageSize),
                map: map,
            });

            // 새로운 마커를 상태로 저장
            targetMarker = newMarker;

            const message = {
                type: 'newBinPoint',
                payload: {
                    latitude: targetMarker?.getPosition().getLat(),
                    longitude: targetMarker?.getPosition().getLng()
                }
            };
            window.ReactNativeWebView?.postMessage(JSON.stringify(message));
        });

    
        // 마커 및 기타 오버레이는 맵 로드 후 지연 추가
        setTimeout(() => {
          addMarkersAndOverlays(map);
        }, 500); // 0.5초 지연 후 추가
    
    };

    const addMarkersAndOverlays = (map: kakao.maps.Map) => {
        const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    
        const myMarker = new window.kakao.maps.Marker({
          position: currentPosition,
          image: new window.kakao.maps.MarkerImage("image/Current.svg", new window.kakao.maps.Size(30, 30),  { offset: new window.kakao.maps.Point(15, 15) }),
          zIndex: 3,
        });

        // 마커 클릭 이벤트 추가 (현재 위치 클릭해도 마커 찍을 수 있도록)
        window.kakao.maps.event.addListener(myMarker, 'click', function () {
            const clickPosition = myMarker.getPosition();

            // 기존 targetMarker가 있으면 삭제
            if (targetMarker) {
                targetMarker.setMap(null);
            }

            const imageSrc = "image/reportNewBin/targetMarker.png";
            const imageSize = new window.kakao.maps.Size(35, 47);

            // 새로운 마커 생성
            const newMarker = new window.kakao.maps.Marker({
                position: clickPosition,
                image: new window.kakao.maps.MarkerImage(imageSrc, imageSize),
                map: map,
            });

            // 새로운 마커를 상태로 저장
            targetMarker = newMarker;

            const message = {
                type: 'newBinPoint',
                payload: {
                    latitude: targetMarker?.getPosition().getLat(),
                    longitude: targetMarker?.getPosition().getLng()
                }
            };
            window.ReactNativeWebView?.postMessage(JSON.stringify(message));
        });

        const newMarker = new window.kakao.maps.Marker({
            position: currentPosition,
            image: new window.kakao.maps.MarkerImage("image/reportNewBin/targetMarker.png", new window.kakao.maps.Size(35, 47)),
            zIndex: 4,
        });
    
        myMarker.setMap(map);
        newMarker.setMap(map);
        targetMarker = newMarker;
        setCurrentMarker(myMarker);
    };

    useEffect(() => {
        window.kakao.maps.load(() => initMap());
    }, []);

    return (
        <div id="reportNewBin" style={{ width: "100vw", height: "100vh", background: Palette.Gray1 }}></div>
    )
}

export default ReportNewBin;