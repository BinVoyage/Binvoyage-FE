import  { MutableRefObject, useEffect, useRef } from "react";
import CurLocation from "./CurLocation";

declare global {
  interface Window {
    kakao: any;
  }

}

const Map = () => {
  const location:any = CurLocation();
  const mapRef = useRef<HTMLElement | null>(null);
  const initMap = () =>{
    if (typeof location != 'string' ){
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: 2
      };

      // 마커 이미지
    let imageSrc ="src/assets/Current.svg", 
    imageSize = new window.kakao.maps.Size(30, 30), 
    imageOption = {offset: new window.kakao.maps.Point(location.latitude, location.longitude)};

    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
      let markerPosition = new window.kakao.maps.LatLng(
        location.latitude,
        location.longitude,
      );
  
      // 마커를 생성
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });


      var map = new window.kakao.maps.Map(container as HTMLElement, options);
      (mapRef as MutableRefObject<any>).current = map;
      marker.setMap(map);
    }
  }
  
  useEffect(()=>{
    window.kakao.maps.load(()=>initMap());
  },[mapRef, location])
  
    return <div id="map" style={{ width: "100vw", height: "100vh"}} />;
    
  };
  


  export default Map;