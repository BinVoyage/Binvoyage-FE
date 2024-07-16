import { useMemo, useState } from "react";

type CurLocations = {
  latitude: number;
  longitude: number;
};


function CurLocation() {
    const [location, setLocation] = useState<CurLocations | string>('');

    useMemo(()=>{
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, error);
      }
    
      function success(position: any){
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        console.log(position.coords.latitude)
        console.log("위치 받기성공");
      }
    
      function error(){
        setLocation({
          latitude: 37.483034,
          longitude: 126.902435
        })
        console.log("위치 받기 실패");
      }
    },[navigator.geolocation.getCurrentPosition])
    
    return ( location )
}

export default CurLocation;