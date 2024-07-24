import  { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import CurrentTab from "./CurrentTab";
import Filter from "./Filter";
import { trashpositions,recyclepositions } from "./Places";
import Location from "./Locations";
import axios from "axios";

declare global {
  interface Window {
    kakao: any;
    Polyline:any;
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
  const [save,setSave] = useState<string| null | undefined>('')
  const [gets,setGets] = useState<string| null | undefined>('')
  const mapRef = useRef<HTMLElement | null>(null);
  const initMap = () =>{
    // if (typeof location != 'string' ){
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 2
      };


      // 현위치 마커 이미지
    let currentimageSrc ="image/Current.svg", 
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

      const currentCenter = new window.kakao.maps.LatLng(
        latitude, longitude
      );
        


   // 쓰레기 마커 
   let trashimageSrc = "image/trashmark.svg";

   const settrashMarkers = (maps: any) => {
    trashpositions.forEach(async (obj) => {
      const trashLocation = obj;

      const trashes = await printAddr();

      function printAddr(): Promise<string | undefined | null> {
        return new Promise((resolve, reject) => {
          let geocoder = new window.kakao.maps.services.Geocoder();
          let coord = obj;
          
          let callback = function(result: Array<any>, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const ad = result[0]?.road_address;
              const _arr = ad?.address_name;
              resolve(_arr); 
            } else {
              reject("Failed to get address"); 
            }
          }
          
          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
        });
      }

      new window.kakao.maps.Marker({
        map: maps,
        position: obj,
        image: new window.kakao.maps.MarkerImage(trashimageSrc, imageSize, imageOption),
      })
  
      const poly = new window.kakao.maps.Polyline({
        path: [currentCenter, trashLocation],
      });
  
      const trashdistance = poly.getLength();
      if (trashdistance < 2000) {
        console.log("그냥 :",trashes,", 그냥 쓰레기통 거리:", trashdistance)
      }
    })
  }

type Bins = {
  bin_id:number;
  id:number;
}



 
  const getData = async () => {
    const response = await axios.get(`api/bin/search?lat=${latitude}&lng=${longitude}&radius=2000`);
    console.log(response)
    console.log(response.data?.data.bin_list);
  };

getData()





  



// 재활용 쓰레기통
let recycleimageSrc = "image/recyclemark.svg";

const setrecycleMarkers = (maps: any) => {
  recyclepositions.forEach(async (obj) => {
    const binLocation = obj;

    const recycles = await printAddr();

    function printAddr(): Promise<string | undefined | null> {
      return new Promise((resolve, reject) => {
        let geocoder = new window.kakao.maps.services.Geocoder();
        let coord = obj;
        
        let callback = function(result: Array<any>, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const ad = result[0]?.road_address;
            const _arr = ad?.address_name;
            resolve(_arr); 
          } else {
            reject("Failed to get address"); 
          }
        }
        
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      });
    }

    new window.kakao.maps.Marker({
      map: maps,
      position: obj,
      image: new window.kakao.maps.MarkerImage(recycleimageSrc, imageSize, imageOption),
    })

    const poly = new window.kakao.maps.Polyline({
      path: [currentCenter, binLocation],
    });

    const recycledistance = poly.getLength();
    if (recycledistance < 2000) {
      console.log("재활용 :",recycles,",",recycledistance)
    }

  })
}



const map = new window.kakao.maps.Map(container as HTMLElement, options);
      (mapRef as MutableRefObject<any>).current = map;
      currentmarker.setMap(map);
      settrashMarkers(map);
      setrecycleMarkers(map);
  }


  
  function getAddr(): Promise<string | undefined | null> {
    return new Promise((resolve, reject) => {
      let geocoder = new window.kakao.maps.services.Geocoder();
      let coord = new window.kakao.maps.LatLng(latitude, longitude);
      
      let callback = function(result: Array<any>, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const ad = result[0]?.road_address;
          const _arr = ad?.region_2depth_name + " , " + ad?.region_1depth_name;
          resolve(_arr); 
        } else {
          reject("주소를 가져오는데 실패했습니다."); 
        }
      }
      
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    });
  }

  // getAddr로 가져온 주소 화면 출력
  useEffect(() => {
    getAddr()
      .then((response) => {
        setSave(response);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [save]);



  const address:any= getAddr();


  useMemo(() => {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    const message = {
      type: 'address',
      payload: {
        address: address,
        save:save,
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
   <CurrentTab children={save}/>
   <Filter/>
    <Location/>
  </>
);
  
    
  };
  


  export default Map;