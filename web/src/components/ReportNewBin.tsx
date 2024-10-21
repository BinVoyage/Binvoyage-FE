import { useRef, MutableRefObject, useState, useEffect } from "react";
import { Palette } from "../constants/palette";
import api from "../api/api";
import { BinInfo, MarkerInfo } from "../types/types";

type ReportNewBinProps = {
    latitude: number;
    longitude: number;
    triggerRefresh: number;
}

const ReportNewBin = ({latitude, longitude, triggerRefresh}: ReportNewBinProps) => {
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
    const [currentMarker, setCurrentMarker] = useState<kakao.maps.Marker | null>(null);
    const [markers, setMarkers] = useState<MarkerInfo[]>([]);
    let targetMarker: kakao.maps.Marker | null = null;

    const initMap = () => {
        const container = document.getElementById('reportNewBin');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
    
        const map = new window.kakao.maps.Map(container as HTMLElement, options);
        (mapRef as MutableRefObject<kakao.maps.Map | null>).current = map;

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
    
        setIsMapLoaded(true);
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

        fetchBinData(latitude, longitude);

        // 첫 로드 시 마커 위치 초기화 메세지
        const message = {
            type: 'newBinPoint',
            payload: {
                latitude: currentPosition.getLat(),
                longitude: currentPosition.getLng()
            }
        };
        window.ReactNativeWebView?.postMessage(JSON.stringify(message));
    };

    // API를 통해 실제 데이터를 가져오는 함수
   const fetchBinData = async (lat: number, lng: number) => {
    try {
      const response = await api.get(`/bin/search?lat=${lat}&lng=${lng}&radius=2000&filter=0`);
  
      console.log(response.data);  // 전체 응답 데이터 구조 확인
      console.log(response.data.data);  // data 속성 확인
  
      if (response.data.code === 12000) {
        console.log(response.data.data.bin_list);  // bin_list 출력
        const newBinList = response.data.data.bin_list;
  
        // 새로운 데이터로 마커 초기화
        // setData(newBinList);
        initMarkers(newBinList);
      } else {
        console.log(response.data.message);
      }
  
    } catch (error: any) {
      console.log('Failed to fetch bin data:', error.message);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
    }
  };
  
  const initMarkers = (binList: BinInfo[]) => {
    // 기존 마커 제거
    markers.forEach((markerInfo) => {
      markerInfo.marker.setMap(null); // 지도에서 기존 마커 제거
    });
  
    // 마커 목록 초기화
    setMarkers([]);
  
    const updatedMarkers: MarkerInfo[] = [];
  
    if (mapRef.current) {
      binList.forEach(bin => {
        const binLocation = new window.kakao.maps.LatLng(bin.coordinate[1], bin.coordinate[0]);
        const markerImageSrc = 'image/reportNewBin/bin-primary-dot.svg';
  
        // 새로 추가된 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: binLocation,
          image: new window.kakao.maps.MarkerImage(markerImageSrc, new window.kakao.maps.Size(16, 16)),
          map: mapRef.current!,
        });
  
        updatedMarkers.push({
          marker: marker,
          type_no: bin.type_no,
          map: mapRef.current!,
          visit_count: bin.visit_count
        });

      });
  
      setMarkers(updatedMarkers); // 새로운 마커들로 상태를 업데이트
    } else {
      console.error("Map object is not initialized.");
    }
  };

    useEffect(() => {
        window.kakao.maps.load(() => initMap());

    }, []);

    // 좌표 변경 시 currentMarker 이동 처리
    useEffect(() => {
        if (mapRef.current && isMapLoaded && currentMarker) {
            const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
            currentMarker.setPosition(currentPosition);
        }
    }, [latitude, longitude, isMapLoaded]);

    // triggerRefresh가 변경될 때만 지도 중심 이동 처리
    useEffect(() => {
        if (mapRef.current && isMapLoaded && currentMarker && triggerRefresh) {
            const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
            mapRef.current.setCenter(currentPosition);
        }
    }, [triggerRefresh, isMapLoaded]);

    return (
        <div id="reportNewBin" style={{ width: "100vw", height: "100vh", background: Palette.Gray1 }}></div>
    )
}

export default ReportNewBin;