import { useMemo, useState } from "react";
import CurLocation from "./CurLocation";

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


//   function getAddr(lat:number,lng:number){
//     // 주소-좌표 변환 객체를 생성합니다,
    
//     const [address, setAddress] = useState<any | string>('');
//     const location:any = CurLocation();
//     let geocoder = new window.kakao.maps.services.Geocoder();
//     let infowindow = new window.kakao.maps.InfoWindow({zindex:1});
//     let coord = new window.kakao.maps.LatLng(lat = location.latitude, lng = location.longitude);
//     let callback = () => function(result:Array<any>, status:any) {
//      useMemo(()=>{
//         if (status === window.kakao.maps.services.Status.OK) {
//             // const arr ={ ...result} ;
//             let callback = function(result:Array<any>, status:any) {
//               if (status === window.kakao.maps.services.Status.OK) {
//                 let detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
//                   // console.log(result[0].address.address_name);
                
//                   // let arr = result[0].address.address_name.toString()
//                   let arr = detailAddr.toString();
                    
//             let content = '<div class="bAddr">' +
//             '<span class="title">주소정보</span>' + 
//             arr + 
//         '</div>';
//         infowindow.setContent(content);
//                   setAddress({arr})
//               }
//           }
//           geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

//         }
//     },[navigator.geolocation])
//     return (address)   
//   }
// }



//  function getAddr(){
//     // 주소-좌표 변환 객체를 생성합니다,
    
//     const [address, setAddress] = useState<any | string>('');
//     const location:any = CurLocation();
//     let geocoder = new window.kakao.maps.services.Geocoder();
//     let coord = new window.kakao.maps.LatLng(location.latitude, location.longitude);
//     let callback = () => function(result:Array<any>, status:any) {
//      useMemo(()=>{
//         if (status === window.kakao.maps.services.Status.OK) {
//             // const arr ={ ...result} ;
//             // const ad = result[0]?.road_address;
//             // const arr = ad?.region_2depth_name + " , " + ad?.region_1depth_name;
//             // setAddress({arr :arr.toString()})
//             // console.log(arr);
//           const ad =  !!result[0].road_address ? ' ' + result[0].road_address.address_name + '' : '';
//           let content  =  ad
//           setAddress({
//             content
//           })
//           // return (address);
//       // }

//         }
//     },[navigator.geolocation.getCurrentPosition])
//     geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
//     // geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), callback);
//     return (address)   
//   }
// }





// export default getAddr;

// 현재

// function CurAdress(){
//   // 주소-좌표 변환 객체를 생성합니다
//   const location:any = CurLocation();
//   let geocoder = new window.kakao.maps.services.Geocoder();
//   const [address, setAddress] = useState<any | string>('');
//   let coord = new window. kakao.maps.LatLng(location.latitude, location.longitude);
//   let callback = function(result:any, status: any) {
//       if (status === window.kakao.maps.services.Status.OK) {
      //   const ad =  !!result[0].road_address ? ' ' + result[0].road_address.address_name + '' : '';
      //     let content  =  ad
      //     setAddress({
      //       content
      //     })
      //     return (address);
      // }
//   }
//   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

// }
// export default CurAdress


// function CurAdress(){
//         // 주소-좌표 변환 객체를 생성합니다
//         const location:any = CurLocation();
//         let geocoder = new window.kakao.maps.services.Geocoder();
      
//         let coord = new window. kakao.maps.LatLng(location.latitude, location.longitude);
//         let callback = function(result:any, status: any) {
//             if (status === window.kakao.maps.services.Status.OK) {
//                 let res =  result[0].road_address.address_name
//                 console.log(res);
//             }
//         }
//         geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    
// }
// export default CurAdress