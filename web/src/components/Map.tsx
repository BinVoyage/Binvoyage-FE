import  { MutableRefObject, useEffect, useMemo, useRef } from "react";
import CurrentTab from "./CurrentTab";
import Filter from "./Filter";
import { trashpositions,recyclepositions } from "./Places";
import TrashmarkSvg from "../assets/TrashmarkSvg";

declare global {
  interface Window {
    kakao: any;
    i:number;
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
  const mapRef = useRef<HTMLElement | null>(null);
  const initMap = () =>{
    // if (typeof location != 'string' ){
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 2
      };


      // 현위치 마커 이미지
    let currentimageSrc ="src/assets/Current.svg", 
    imageSize = new window.kakao.maps.Size(30, 30), 
    imageOption = {offset: new window.kakao.maps.Point(latitude, longitude)};

    let currentImage = new window.kakao.maps.MarkerImage(currentimageSrc, imageSize, imageOption)
      let currentPosition = new window.kakao.maps.LatLng(
        latitude,
        longitude,
      );
  
      // 현위치 마커를 생성
      let currentmarker = new window.kakao.maps.Marker({
        position: currentPosition,
        image: currentImage,
      });

    
   // 쓰레기 마커 
   let trashimageSrc = "src/assets/trashmark.svg";

   const settrashMarkers = (map: any) => {
    trashpositions.forEach((obj) => {
      new window.kakao.maps.Marker({
        map: map,
        position: obj,
        image: new window.kakao.maps.MarkerImage(trashimageSrc, imageSize, imageOption),
      })
    })
  }

let recycleimageSrc = "src/assets/recyclemark.svg";

const setrecycleMarkers = (maps: any) => {
  recyclepositions.forEach((obj) => {
    new window.kakao.maps.Marker({
      map: maps,
      position: obj,
      image: new window.kakao.maps.MarkerImage(recycleimageSrc, imageSize, imageOption),
    })
  })
}



const map = new window.kakao.maps.Map(container as HTMLElement, options);
      (mapRef as MutableRefObject<any>).current = map;
      currentmarker.setMap(map);
      // trashmarker.setMap(map);
      settrashMarkers(map);
      setrecycleMarkers(map);
    // }
  }




  let _arr: string | undefined | null | any;

  function getAddr() {
    let geocoder = new window.kakao.maps.services.Geocoder();
    let coord = new window.kakao.maps.LatLng(latitude, longitude);
    
    let callback = function(result: Array<any>, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const ad = result[0]?.road_address;
        _arr = ad?.region_2depth_name + " , " + ad?.region_1depth_name;
        console.log(_arr); // _arr의 값을 출력합니다.
        if(typeof _arr == 'string'){
          return _arr
        }
        
      }
    }
    
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }
  
  const address:typeof _arr= getAddr();





  useMemo(() => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    const message = {
      type: 'address',
      payload: {
        address: address
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
   <CurrentTab children={"현위치 주소 출력 안됨"}/>
   <Filter/>
    {/* <Location/> */}
  </>
);
  
    
  };
  


  export default Map;