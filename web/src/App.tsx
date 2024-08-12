import { useEffect, useState } from "react";
import Map from "./components/Map";
import { useStore } from "./store/Store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VerifyVisit from "./components/VerifyVisit";


type CurrentLocation = {
  latitude: number;
  longitude: number;
};

function App() {
  const [isLocationSet, setIsLocationSet] = useState<boolean>(false); // 위치 설정 여부 상태 추가
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>({latitude: 37.563685889, longitude: 126.975584404});
  const {setFilterMode} = useStore();
  const [triggerSearch, setTriggerSearch] = useState<number>(0);
  const [triggerRefresh, setTriggerRefresh] = useState<number>(0);

  // VerifyVisit
  const [targetLocation, setTargetLocation] = useState<CurrentLocation | null>({latitude: 37.54397760413326, longitude: 127.12560598299282})

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
        } else if (message.type === "refresh") {
            setTriggerRefresh(Math.random());
        } else if (message.type === "verify") {
          const { latitude, longitude, bin_lat, bin_lng } = message.payload;
          setCurrentLocation({
            latitude: latitude,
            longitude: longitude
          });
          setTargetLocation({
            latitude: bin_lat,
            longitude: bin_lng,
          })
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            currentLocation && isLocationSet &&(
              <Map
                latitude={currentLocation.latitude}
                longitude={currentLocation.longitude}
                triggerSearch={triggerSearch}
                triggerRefresh={triggerRefresh}
              />
            )
          }
        />
        <Route
          path="/verify"
          element={
            <VerifyVisit latitude={currentLocation!.latitude} longitude={currentLocation!.longitude} bin_lat={targetLocation!.latitude} bin_lng={targetLocation!.longitude}/>
          }
        />
      </Routes>
    </Router>

  );
}

export default App;
