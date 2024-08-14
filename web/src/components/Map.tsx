import { MutableRefObject, useEffect, useRef, useState } from "react";
import { mapStore } from "../store/Store";
import debounce from "lodash.debounce";
import { BinInfo } from "../types/types";
import axios from "axios";
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
  const markersRef = useRef<MarkerInfo[]>([]);
  const filterMode = mapStore(state => state.filterMode);
  const [currentMarker, setCurrentMarker] = useState<kakao.maps.Marker | null>(null);
  const [center, setCenter] = useState<kakao.maps.LatLng | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [_, setData] = useState<BinInfo[]>([]);

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
    
    fetchBinData(latitude, longitude); // 지도 초기화 시 데이터 가져오기

    // 중심 좌표 변경 이벤트 리스너 추가
    window.kakao.maps.event.addListener(map, 'center_changed', debounce(handleCenterChanged, 500));

    // 사용자가 확대/축소할 때 최대 레벨을 제한하는 이벤트 리스너 추가
    window.kakao.maps.event.addListener(map, 'zoom_changed', function() {
      const currentLevel = map.getLevel();
      if (currentLevel > 7) { // 최대 레벨을 7로 제한
        map.setLevel(7); // 다시 레벨 7로 되돌림
      }
      map.setCenter(currentPosition); // 현재 위치를 중심으로 설정
    });

    setIsMapLoaded(true);
  };

   // API를 통해 실제 데이터를 가져오는 함수
   const fetchBinData = async (lat: number, lng: number) => {
    try {
      const response = await api.get(`/bin/search?lat=37.563685889&lng=126.975584404&radius=1000&filter=0`);

      if (response.data.success) {
        setData(response.data.data);
        initMarkers(response.data.data);
        filterMarkers(filterMode);
      } else {
        console.log(response.data);
      }
      
    } catch (error) {
      console.error('Failed to fetch bin data:', error);
    }
  };

  const initMarkers = (binList: BinInfo[]) => {
    markersRef.current = []; // 이전 마커 초기화

    binList.forEach(bin => {
      const binLocation = new window.kakao.maps.LatLng(bin.coordinate[0], bin.coordinate[1]);
      const markerImageSrc = bin.type_no === 1 ? "image/trashmark.svg" : "image/recyclemark.svg";

      const marker = new window.kakao.maps.Marker({
        position: binLocation,
        image: new window.kakao.maps.MarkerImage(markerImageSrc, new window.kakao.maps.Size(30, 30)),
        map: null, // 처음에는 표시하지 않음
      });

      // 마커에 클릭 이벤트 추가
      window.kakao.maps.event.addListener(marker, 'click', () => {
        // React Native로 메시지 보내기
        const message = {
          type: 'markerClick',
          payload: {
            bin_id: bin.bin_id
          }
        };
        window.ReactNativeWebView?.postMessage(JSON.stringify(message));
      });

      markersRef.current.push({
        marker: marker,
        type_no: bin.type_no,
        map: mapRef.current!,
        distance: calculateDistance(binLocation),
      });
    });
  };

  const calculateDistance = (binLocation: any) => {
    const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const poly = new window.kakao.maps.Polyline({
      path: [currentPosition, binLocation],
    });
    return poly.getLength();
  };

  const filterMarkers = (filterMode: number) => {
    markersRef.current.forEach(markerObj => {
      if (filterMode === -1 || filterMode === 0) {
        if (markerObj.distance <= 2000) {
          markerObj.marker.setMap(markerObj.map);
        }
      } else if (filterMode === 1 && markerObj.type_no === 1) {
        if (markerObj.distance <= 2000) {
          markerObj.marker.setMap(markerObj.map);
        }
      } else if (filterMode === 2 && markerObj.type_no === 2) {
        if (markerObj.distance <= 2000) {
          markerObj.marker.setMap(markerObj.map);
        }
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
      mapRef.current.setCenter(currentPosition);
    }
  }, [latitude, longitude, isMapLoaded, triggerRefresh]);

  useEffect(() => {
    filterMarkers(filterMode); // filterMode 변경 시 마커 필터링
  }, [filterMode]);

  useEffect(() => {
    if (triggerSearch) {
      alert(`center: 룰루랄라`)
    }
  }, [triggerSearch])

  return (
    <>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default Map;
