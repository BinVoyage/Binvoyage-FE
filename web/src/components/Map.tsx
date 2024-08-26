import { MutableRefObject, useEffect, useRef, useState } from "react";
import { mapStore } from "../store/Store";
import debounce from "lodash.debounce";
import { BinInfo } from "../types/types";
import api from "../api/api";

type CurrentLocation = {
  latitude: number;
  longitude: number;
  triggerSearch: number;
  triggerRefresh: number;
};

type MarkerInfo = {
  marker: kakao.maps.Marker;
  type_no: number;
  map: kakao.maps.Map;
  distance: number;
};

const Map = ({ latitude, longitude, triggerSearch, triggerRefresh }: CurrentLocation) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  // const markersRef = useRef<MarkerInfo[]>([]);
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const filterMode = mapStore(state => state.filterMode);
  const [currentMarker, setCurrentMarker] = useState<kakao.maps.Marker | null>(null);
  const [center, setCenter] = useState<kakao.maps.LatLng | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  // const [_, setData] = useState<BinInfo[]>([]);
  let selectedMarker: kakao.maps.Marker | null = null;
  let selectedMarkerSrc: string | null = null;

  const initMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3
    };

    const currentImageSrc = "image/Current.svg";
    const imageSize = new window.kakao.maps.Size(30, 30);
    const imageOption = { offset: new window.kakao.maps.Point(15, 15) };
    const currentImage = new window.kakao.maps.MarkerImage(currentImageSrc, imageSize, imageOption);
    const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const myMarker = new window.kakao.maps.Marker({
      position: currentPosition,
      image: currentImage,
    });

    const map = new window.kakao.maps.Map(container as HTMLElement, options);
    (mapRef as MutableRefObject<kakao.maps.Map | null>).current = map;
    myMarker.setMap(map);
    setCurrentMarker(myMarker); 
    
    fetchBinData(latitude, longitude);
    // fetchBinData(37.563685889, 126.975584404); // 지도 초기화 시 데이터 가져오기

    // 중심 좌표 변경 이벤트 리스너 추가
    window.kakao.maps.event.addListener(map, 'center_changed', debounce(handleCenterChanged, 500));

    // 사용자가 확대/축소할 때 최대 레벨을 제한하는 이벤트 리스너 추가
    // window.kakao.maps.event.addListener(map, 'zoom_changed', function() {
    //   const currentLevel = map.getLevel();
    //   if (currentLevel > 7) { // 최대 레벨을 7로 제한
    //     map.setLevel(7); // 다시 레벨 7로 되돌림
    //   }
    //   map.setCenter(currentPosition); // 현재 위치를 중심으로 설정
    // });

    // 맵 클릭 이벤트 리스너 추가
    window.kakao.maps.event.addListener(map, 'click', function() {
      const message = {
        type: 'mapClick',
      };
      window.ReactNativeWebView?.postMessage(JSON.stringify(message));
    });

    setIsMapLoaded(true);
  };

   // API를 통해 실제 데이터를 가져오는 함수
   const fetchBinData = async (lat: number, lng: number) => {
    try {
      const response = await api.get(`/bin/search?lat=${lat}&lng=${lng}&radius=1000&filter=0`);
  
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
    markers.forEach((markerInfo, index) => {
      console.log(index);
      markerInfo.marker.setMap(null); // 지도에서 기존 마커 제거
    });
  
    // 마커 목록 초기화
    setMarkers([]);
  
    const updatedMarkers: MarkerInfo[] = [];
  
    if (mapRef.current) {
      binList.forEach(bin => {
        const binLocation = new window.kakao.maps.LatLng(bin.coordinate[1], bin.coordinate[0]);
        const markerImageSrc = bin.type_no === 1 ? "image/trashmark.svg" : "image/recyclemark.svg";
        const zIndex = bin.type_no === 2 ? 10 : 5;
  
        // 새로 추가된 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: binLocation,
          image: new window.kakao.maps.MarkerImage(markerImageSrc, new window.kakao.maps.Size(30, 30)),
          map: mapRef.current!,
          zIndex: zIndex
        });
  
        // 마커에 클릭 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (selectedMarker && selectedMarkerSrc) {
            selectedMarker.setImage(new window.kakao.maps.MarkerImage(selectedMarkerSrc, new window.kakao.maps.Size(30, 30)));
          }
  
          // 현재 클릭된 마커의 이미지를 "targetMarker.svg"로 변경
          marker.setImage(new window.kakao.maps.MarkerImage("image/targetMarker.svg", new window.kakao.maps.Size(30, 30)));
  
          // 선택된 마커와 이미지 경로 저장
          selectedMarker = marker;
          selectedMarkerSrc = markerImageSrc;
  
          const message = {
            type: 'markerClick',
            payload: {
              bin_id: bin.bin_id
            }
          };
          window.ReactNativeWebView?.postMessage(JSON.stringify(message));
        });
  
        updatedMarkers.push({
          marker: marker,
          type_no: bin.type_no,
          map: mapRef.current!,
          distance: calculateDistance(binLocation),
        });
      });
  
      setMarkers(updatedMarkers); // 새로운 마커들로 상태를 업데이트
      filterMarkers(filterMode, updatedMarkers);  // 필터링 적용
    } else {
      console.error("Map object is not initialized.");
    }
  };
  

  const calculateDistance = (binLocation: any) => {
    const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const poly = new window.kakao.maps.Polyline({
      path: [currentPosition, binLocation],
    });
    return poly.getLength();
  };

  const filterMarkers = (filterMode: number, markerList: MarkerInfo[]) => {
    markerList.forEach(markerObj => {
      if (filterMode === -1 || filterMode === 0) {
          markerObj.marker.setMap(markerObj.map);
      } else if (filterMode === 1 && markerObj.type_no === 1) {
          markerObj.marker.setMap(markerObj.map);
      } else if (filterMode === 2 && markerObj.type_no === 2) {
          markerObj.marker.setMap(markerObj.map);
      } else {
        markerObj.marker.setMap(null);
      }
    });
  };

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      const currentCenter = center;
      const distance = currentCenter ? calculateDistance(newCenter) : Infinity;

      // 유의미한 변화로 간주하는 거리 설정 (예: 100m 이상 이동 시)
      const significantDistance = 100;

      if (distance > significantDistance) {
        setCenter(newCenter);
        // React Native로 메시지 보내기
        window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'centerMoved', payload: {latitude: newCenter.getLat(), longitude: newCenter.getLng()} }));
      }
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

  useEffect(() => {
    filterMarkers(filterMode, markers); // filterMode 변경 시 마커 필터링
  }, [filterMode, markers]);

  useEffect(() => {
    if (triggerSearch && center) {
      const lat= center.getLat();
      const lng = center.getLng();
      fetchBinData(lat, lng);
    }
  }, [triggerSearch])

  return (
    <>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default Map;