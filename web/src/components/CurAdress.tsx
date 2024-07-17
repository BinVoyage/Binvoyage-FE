import { useState } from "react";
import CurLocation from "./CurLocation";

type Address = {
    address?:any;
  };


function CurAdress(){
        // 주소-좌표 변환 객체를 생성합니다
        const location:any = CurLocation();
        let geocoder = new window.kakao.maps.services.Geocoder();
      
        let coord = new window. kakao.maps.LatLng(location.latitude, location.longitude);
        let callback = function(result:any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                let res =  result[0].road_address.address_name
                console.log(res);
            }
        }
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    
}
export default CurAdress