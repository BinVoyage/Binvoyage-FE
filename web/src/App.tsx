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
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(defaultLocation);
  const {setFilterMode} = useStore();

  useEffect(() => {
    const handleMessage = (event: any) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "location") {
          const { latitude, longitude } = message.payload;

          setCurrentLocation({
            latitude: latitude,
            longitude: longitude
          });

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
      <Map latitude={currentLocation.latitude} longitude={currentLocation.longitude} />
    </div>
  );
}

export default App;
