import { useEffect, useState } from "react";
import Map from "./components/Map";
import { MarkerStore } from "./store/Store";

type CurrentLocation = {
  latitude: number;
  longitude: number;
};

function App() {
  const markerList = MarkerStore(state => state.markers);

  const defaultLocation: CurrentLocation = {
    latitude: 37.123456,
    longitude: 127.123456,
  };
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(defaultLocation);

  useEffect(() => {
    const handleMessage = (event: any) => {
      const message = JSON.parse(event.data);
      if (message.type === "location") {
        setCurrentLocation({
          latitude: message.payload.latitude,
          longitude: message.payload.longitude,
        });
        return currentLocation;
      }
    };

    if (navigator.userAgent.match(/Android/i)) {
      document.addEventListener("message", handleMessage, true);
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      window.removeEventListener("message", handleMessage);
    }
  }, [markerList]);

  return (
    <div>
      <Map latitude={currentLocation.latitude} longitude={currentLocation.longitude} />
    </div>
  );
}

export default App;
