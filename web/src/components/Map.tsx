import  { MutableRefObject, useEffect, useRef } from "react";
import CurLocation from "./CurLocations";

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
  
      var map = new window.kakao.maps.Map(container as HTMLElement, options);
      (mapRef as MutableRefObject<any>).current = map;
    }
  }
  
  useEffect(()=>{
    window.kakao.maps.load(()=>initMap());
  },[mapRef, location])
  
    return <div id="map" style={{ width: "100vw", height: "100vh" }} />;
    
  };
  


  export default Map;