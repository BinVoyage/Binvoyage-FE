import { MutableRefObject, useEffect, useRef, useState } from "react";
import { trashPositions, recyclePositions } from "./Places";
import axios from "axios";

declare global {
  interface Window {
    kakao: any;
    polyline: any;
    reactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

type CurrentLocation = {
  latitude: number;
  longitude: number;
};

const Map = ({ latitude, longitude }: CurrentLocation) => {
  const [save, setSave] = useState<string | null | undefined>('');
  const mapRef = useRef<HTMLElement | null>(null);

  const initMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 2
    };

    const currentImageSrc = "image/Current.svg";
    const imageSize = new window.kakao.maps.Size(30, 30);
    const imageOption = { offset: new window.kakao.maps.Point(latitude, longitude) };
    const currentImage = new window.kakao.maps.MarkerImage(currentImageSrc, imageSize, imageOption);
    const currentPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const currentMarker = new window.kakao.maps.Marker({
      position: currentPosition,
      image: currentImage,
    });

    const setTrashMarkers = (maps: any) => {
      trashPositions.forEach(async (obj) => {
        const trashLocation = obj;
        const trashes = await printAddr(trashLocation);

        new window.kakao.maps.Marker({
          map: maps,
          position: obj,
          image: new window.kakao.maps.MarkerImage("image/trashmark.svg", imageSize, imageOption),
        });

        const poly = new window.kakao.maps.Polyline({
          path: [currentPosition, trashLocation],
        });

        const trashDistance = poly.getLength();
        if (trashDistance < 2000) {
          console.log("Trash bin:", trashes, ", Distance:", trashDistance);
        }
      });
    };

    const setRecycleMarkers = (maps: any) => {
      recyclePositions.forEach(async (obj) => {
        const binLocation = obj;
        const recycles = await printAddr(binLocation);

        new window.kakao.maps.Marker({
          map: maps,
          position: obj,
          image: new window.kakao.maps.MarkerImage("image/recyclemark.svg", imageSize, imageOption),
        });

        const poly = new window.kakao.maps.Polyline({
          path: [currentPosition, binLocation],
        });

        const recycleDistance = poly.getLength();
        if (recycleDistance < 2000) {
          console.log("Recycle bin:", recycles, ", Distance:", recycleDistance);
        }
      });
    };

    const printAddr = (coord: any): Promise<string | undefined | null> => {
      return new Promise((resolve, reject) => {
        let geocoder = new window.kakao.maps.services.Geocoder();
        let callback = function (result: Array<any>, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const ad = result[0]?.road_address;
            const addressName = ad?.address_name;
            resolve(addressName);
          } else {
            reject("Failed to get address");
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      });
    };

    const map = new window.kakao.maps.Map(container as HTMLElement, options);
    (mapRef as MutableRefObject<any>).current = map;
    currentMarker.setMap(map);
    setTrashMarkers(map);
    setRecycleMarkers(map);
  };

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, [latitude, longitude]);

  return (
    <>
      <div id="map" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default Map;
