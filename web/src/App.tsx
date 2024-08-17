import { useEffect, useState } from "react";
import Map from "./components/Map";
import { mapStore } from "./store/Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VerifyVisit from "./components/VerifyVisit";

type CurrentLocation = {
  latitude: number;
  longitude: number;
};

type VerifyLocation = {
  latitude: number;
  longitude: number;
  bin_lat: number;
  bin_lng: number;
};

function App() {
  const [isLocationSet, setIsLocationSet] = useState<boolean>(false);
  // const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>({latitude:37.563685889,longitude:126.975584404});
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const { setFilterMode } = mapStore();
  const [triggerSearch, setTriggerSearch] = useState<number>(0);
  const [triggerRefresh, setTriggerRefresh] = useState<number>(0);

  // VerifyVisit
  const [verifyLocation, setVerifyLocation] = useState<VerifyLocation | null>(null);
  // const [verifyLocation, setVerifyLocation] = useState<VerifyLocation | null>({
  //   latitude: 37.563685889,
  //   longitude: 126.975584404,
  // });

  useEffect(() => {
    const handleMessage = (event: any) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'location') {
          const { latitude, longitude } = message.payload;

          setCurrentLocation({
            latitude: latitude,
            longitude: longitude,
            // latitude: 37.563685889,
            // longitude: 126.975584404,
          });
          setIsLocationSet(true);

          const geocoder = new window.kakao.maps.services.Geocoder();
          const coord = new window.kakao.maps.LatLng(latitude, longitude);

          geocoder.coord2RegionCode(
            coord.getLng(),
            coord.getLat(),
            (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0]?.address_name || '';
                const slicedAddress = address.split(' ').slice(0, 2).join(' ');
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({
                    type: 'address',
                    payload: {
                      address: slicedAddress,
                    },
                  })
                );
              }
            }
          );
        } else if (message.type === 'filter') {
          setFilterMode(message.payload.filterMode);
        } else if (message.type === 'search') {
          setTriggerSearch(Math.random());
        } else if (message.type === 'refresh') {
          setTriggerRefresh(Math.random());
        } else if (message.type === 'verify') {
          const { latitude, longitude, bin_lat, bin_lng } = message.payload;
          setVerifyLocation({
            latitude,
            longitude,
            bin_lat,
            bin_lng,
          });
        }
      } catch (error) {
        alert(`Error parsing message: ${error}`);
      }
    };

    if (navigator.userAgent.match(/Android/i)) {
      document.addEventListener('message', handleMessage, true);
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      window.addEventListener('message', handleMessage);
    }

    return () => {
      if (navigator.userAgent.match(/Android/i)) {
        document.removeEventListener('message', handleMessage, true);
      } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        window.removeEventListener('message', handleMessage);
      }
    };
  }, [currentLocation]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            currentLocation && isLocationSet && (
              <Map
                latitude={currentLocation!.latitude}
                longitude={currentLocation!.longitude}
                triggerSearch={triggerSearch}
                triggerRefresh={triggerRefresh}
              />
            )
          }
        />
        <Route
          path="/verify"
          element={
            // verifyLocation && <VerifyVisit verifyLocation={verifyLocation} />
            <VerifyVisit verifyLocation={verifyLocation!} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;