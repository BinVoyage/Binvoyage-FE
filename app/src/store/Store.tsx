import {create} from 'zustand';

interface useStore {
  currentPosition: CurrentPosition | null;
  setCurrentPosition: (position: CurrentPosition) => void;
}
export const useStore = create<useStore>(set => ({
  currentPosition: null,
  setCurrentPosition: position => set({currentPosition: position}),
}));
