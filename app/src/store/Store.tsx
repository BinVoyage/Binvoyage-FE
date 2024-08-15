import {create} from 'zustand';

interface mapStore {
  currentPosition: CurrentPosition | null;
  setCurrentPosition: (position: CurrentPosition) => void;
}

interface userStore {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
}

interface Picturestore {
  images: Image[];
  addImages: (newImage: Image) => void;
}

export const mapStore = create<mapStore>(set => ({
  currentPosition: null,
  setCurrentPosition: position => set({currentPosition: position}),
}));

export const userStore = create<userStore>(set => ({
  userInfo: null,
  setUserInfo: info => set({userInfo: info}),
}));

export const pictureStore = create<Picturestore>(set => ({
  images: [],
  addImages: (newImage: Image) =>
    set(state => ({
      images: [...state.images, newImage],
    })),
}));
