import  { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import CurLocation from "./CurLocation";
import CurrentTab from "./CurrentTab";
// import getAddr from "./CurAdress";
import Filter from "./Filter";

declare global {
  interface Window {
    kakao: any;
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }

}


type CurrentLocation = {
  latitude: number;
  longitude: number;
};

const Map = ({ latitude, longitude }: CurrentLocation) => {
  const location:any = CurLocation();
  // const [address, setAddress] = useState<any | string>('');
  // const address:any = CurAdress();
  const mapRef = useRef<HTMLElement | null>(null);
  const initMap = () =>{
    if (typeof location != 'string' ){
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 2
      };


      // 현위치 마커 이미지
    let imageSrc ="src/assets/Current.svg", 
    imageSize = new window.kakao.maps.Size(30, 30), 
    imageOption = {offset: new window.kakao.maps.Point(latitude, longitude)};

    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
      let markerPosition = new window.kakao.maps.LatLng(
        latitude,
        longitude,
      );
  
      // 현위치 마커를 생성
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });


      const map = new window.kakao.maps.Map(container as HTMLElement, options);
      (mapRef as MutableRefObject<any>).current = map;
      marker.setMap(map);
    }
  }




  let _arr: string | undefined;

  function getAddr() {
    let geocoder = new window.kakao.maps.services.Geocoder();
    let coord = new window.kakao.maps.LatLng(latitude, longitude);
    
    let callback = function(result: Array<any>, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const ad = result[0]?.road_address;
        _arr = ad?.region_2depth_name + " , " + ad?.region_1depth_name;
        console.log(_arr); // _arr의 값을 출력합니다.
        return _arr
      }
    }
    
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }
  
  getAddr()
  const address:any= getAddr();






  useMemo(() => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    const message = {
      type: 'address',
      payload: {
        addressList: address
      }
    };
    window?.ReactNativeWebView?.postMessage(JSON.stringify(message));
    console.log(message)
  }
  }, [address])

  
  useEffect(()=>{
    window.kakao.maps.load(()=>initMap());
  },[latitude, longitude])
  
  return( 
    <>
  <div id="map" style={{ width: "100vw", height: "100vh"}} />
   <CurrentTab children={address}/>
   <Filter/>
    {/* <Location/> */}
  </>
);
  
    
  };
  


  export default Map;