declare global {
    interface Window {
      kakao: any;
       latng: string | number;
       maps:any;
    }
  
  }
  
export const trashpositions:any[] = [
    new window.kakao.maps.LatLng(37.54397760413326, 127.12560598299282),
    new window.kakao.maps.LatLng(37.5663174209601, 126.977829174031),
    new window.kakao.maps.LatLng(37.5674198878673, 126.977873671097),
    new window.kakao.maps.LatLng(37.5668837502225, 126.976702419575),
    new window.kakao.maps.LatLng(37.570889038138, 126.988250180457),
];


export const recyclepositions:any[] = [
    new window.kakao.maps.LatLng(37.544265748, 127.12577054318095),
    new window.kakao.maps.LatLng(37.5698677620456, 126.977657083792),
    new window.kakao.maps.LatLng(37.54397678904881, 127.12845751143172),
    new window.kakao.maps.LatLng(37.56833564799876, 126.97879048871715),
    new window.kakao.maps.LatLng(37.5500236743432, 127.124404356441),
];


// export const positions = [
//     {
//         title: '해공도서관',
//         latlng: new window.kakao.maps.LatLng(37.54397760413326, 127.12560598299282)
//     },
//     {
//         title: '서울도서관', 
//         latlng: new window.kakao.maps.LatLng(37.566260945449876, 126.97791951616115)
//     },
//     {
//         title: '거리a', 
//         latlng: new window.kakao.maps.LatLng(37.56702223797818, 126.97765895245408)
//     },
//     {
//         title: '서울도시건축도서관', 
//         latlng: new window.kakao.maps.LatLng(37.56687338712348, 126.97669404669486)
//     },
//     {
//         title: '종로인근',
//         latlng: new window.kakao.maps.LatLng(37.57277691088021, 126.99162889124305)
//     },


// ];

// export const positions = [
//     {
//         title: '해공도서관',
//         latitude:37.54397760413326,
//         longitude:127.12560598299282,
//     },
//     {
//         title: '서울도서관', 
//         latitude:37.566260945449876,
//         longitude:126.97791951616115,
//     },
//     {
//         title: '거리a', 
//         latitude:37.56702223797818,
//         longitude:126.97765895245408,
//     },
//     {
//         title: '서울도시건축도서관',
//         latitude:37.56687338712348,
//         longitude:126.97669404669486,
//     },
//     {
//         title: '종로인근',
//         latitude:37.57277691088021,
//         longitude: 126.99162889124305,
//     },


// ];