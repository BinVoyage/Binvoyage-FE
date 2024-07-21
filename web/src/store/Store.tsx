import { create } from "zustand";

type Marker = {
    marker: any; //추후 수정
    id: number;
  }

type MarkerStore =  {
  markers: Marker[];
  setMarkers: (list: Marker[]) => void;
}

export const MarkerStore = create<MarkerStore>((set) => ({
  markers: [],
  setMarkers: (list: Marker[]) => set({ markers: list }),
}));