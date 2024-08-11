import { useEffect, useState } from "react";
import Map from "./components/Map";
import { useStore } from "./store/Store";

type CurrentLocation = {
  latitude: number;
  longitude: number;
};

function App() {
  const defaultLocation: CurrentLocation = {
    latitude: 37.563685889,
    longitude: 126.975584404,
  };
  const [isLocationSet, setIsLocationSet] = useState<boolean>(false); // 위치 설정 여부 상태 추가
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const {setFilterMode} = useStore();
  const [triggerSearch, setTriggerSearch] = useState<number>(0);

  useEffect(() => {
    const handleMessage = (event: any) => {
      try {
        const message = JSON.parse(event.data);
        // alert(`message type: ${message.type}`)
        if (message.type === "location") {
          const { latitude, longitude } = message.payload;

          setCurrentLocation({
            latitude: latitude,
            longitude: longitude
          });
          setIsLocationSet(true);

          const geocoder = new window.kakao.maps.services.Geocoder();
          const coord = new window.kakao.maps.LatLng(latitude, longitude);

          geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), (result:any, status:any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0]?.address_name || '';
              const slicedAddress = address.split(' ').slice(0, 2).join(' ');
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'address',
                payload: {
                  address: slicedAddress,
                },
              }));
            }
          });

        } else if (message.type === "filter") {
          setFilterMode(message.payload.filterMode);
        } else if (message.type === "search") {
          setTriggerSearch(Math.random());
        }
      } catch (error) {
        alert(`Error parsing message: ${error}`);
      }
    };

    if (navigator.userAgent.match(/Android/i)) {
      document.addEventListener("message", handleMessage, true);
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      window.addEventListener("message", handleMessage);
    }

    return () => {
      if (navigator.userAgent.match(/Android/i)) {
        document.removeEventListener("message", handleMessage, true);
      } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        window.removeEventListener("message", handleMessage);
      }
    };
  }, []);

  return (
    <div>
      {isLocationSet && currentLocation ? <Map latitude={currentLocation.latitude} longitude={currentLocation.longitude} triggerSearch={triggerSearch}/> : null}
    </div>
  );
}

export default App;
