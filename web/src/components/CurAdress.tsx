// import { useMemo, useState } from "react";
// import CurLocation from "./CurLocation";

declare global {
    interface Window {
      kakao: any;
    //   ReactNativeWebView: {
    //     postMessage: (message: string) => void;
    //   };
    }
  
  }

  type CurrentLocation = {
    latitude: number;
    longitude: number;
  };

  let _arr: string | undefined;


  function getAddr({ latitude, longitude }: CurrentLocation) {
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
   export default getAddr
