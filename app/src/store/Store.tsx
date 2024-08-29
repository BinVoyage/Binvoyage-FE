import Geolocation from '@react-native-community/geolocation';
import {create} from 'zustand';

interface mapStore {
  currentPosition: CurrentPosition | null;
  setCurrentPosition: (position: CurrentPosition) => void;
  watcherId: number | null;
  setWatcherId: (id: number | null) => void;
  centerPosition: CurrentPosition | null;
  setCenterPosition: (position: CurrentPosition) => void;
  startWatchingPosition: (onPositionUpdate?: (position: CurrentPosition) => void) => void;
  stopWatchingPosition: () => void;
}

interface userStore {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  setUserInfo: (info: UserInfo | null) => void;
  setIsLoggedIn: (value: boolean) => void;
}

interface Picturestore {
  images: Image[];
  addImages: (newImage: Image) => void;
}

export const mapStore = create<mapStore>((set, get) => ({
  currentPosition: null,
  watcherId: null,
  centerPosition: null,
  setCenterPosition: position => set({centerPosition: position}),
  setWatcherId: id => set({watcherId: id}),
  setCurrentPosition: position => set({currentPosition: position}),
  startWatchingPosition: onPositionUpdate => {
    const watcherId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        set({currentPosition: {latitude, longitude}});

        // 위치가 업데이트될 때마다 WebView로 메시지 전송
        if (onPositionUpdate) {
          onPositionUpdate({latitude: latitude, longitude: longitude});
        }
      },
      error => {
        console.log('Geolocation error:', error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000, distanceFilter: 10},
    );
    set({watcherId});
  },

  stopWatchingPosition: () => {
    const {watcherId} = get();
    if (watcherId !== null) {
      Geolocation.clearWatch(watcherId);
      set({watcherId: null});
    }
  },
}));

export const userStore = create<userStore>(set => ({
  userInfo: null,
  setUserInfo: info => set({userInfo: info}),
  isLoggedIn: false,
  setIsLoggedIn: value => set({isLoggedIn: value}),
}));

export const pictureStore = create<Picturestore>(set => ({
  images: [],
  addImages: (newImage: Image) =>
    set(state => ({
      images: [...state.images, newImage],
    })),
}));
