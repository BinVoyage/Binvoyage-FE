import {create} from 'zustand';

interface mapStore {
  currentPosition: CurrentPosition | null;
  setCurrentPosition: (position: CurrentPosition) => void;
}

interface userStore {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
}

export const mapStore = create<mapStore>(set => ({
  currentPosition: null,
  setCurrentPosition: position => set({currentPosition: position}),
}));

export const userStore = create<userStore>(set => ({
  userInfo: null,
  setUserInfo: info => set({userInfo: info}),
}));
