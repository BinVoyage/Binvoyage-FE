import { useRef, MutableRefObject, useState, useEffect } from "react";
import { Palette } from "../constants/palette";

type ReportNewBinProps = {
    latitude: number;
    longitude: number;
}

const ReportNewBin = ({latitude, longitude}: ReportNewBinProps) => {
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
    const [currentMarker, setCurrentMarker] = useState<kakao.maps.Marker | null>(null);
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

        // 마커 클릭 이벤트 추가
        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
            const clickPosition = mouseEvent.latLng;

            // 기존 targetMarker가 있으면 삭제
            if (targetMarker) {
                console.log("removed");
                targetMarker.setMap(null);
            }

            // 새로운 마커 생성
            const newMarker = new window.kakao.maps.Marker({
                position: clickPosition,
                map: map,
            });

            // 새로운 마커를 상태로 저장
            targetMarker = newMarker;
        });

    
        // 마커 및 기타 오버레이는 맵 로드 후 지연 추가
        setTimeout(() => {
          addMarkersAndOverlays(map);
        }, 500); // 0.5초 지연 후 추가
    
    };

    const addMarkersAndOverlays = (map: kakao.maps.Map) => {
        const currentImageSrc = "image/Current.svg";
        // const binImageSrc = "image/targetMarker.svg";
        const imageSize = new window.kakao.maps.Size(30, 30);
        const imageOption = { offset: new window.kakao.maps.Point(15, 15) };
        const currentImage = new window.kakao.maps.MarkerImage(currentImageSrc, imageSize, imageOption);    
        const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    
        const myMarker = new window.kakao.maps.Marker({
          position: currentPosition,
          image: currentImage,
          zIndex: 2,
        });
    
        myMarker.setMap(map);
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