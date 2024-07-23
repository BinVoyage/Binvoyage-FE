import { create } from "zustand";

type Marker = {
    marker: any; //추후 수정
    id: number;
  }

type Address = {
  address:any;
}  

type MarkerStore =  {
  markers: Marker[];
  setMarkers: (list: Marker[]) => void;
  addressList?: Address[];
  setStarAddressList?: (list: Address[]) => void;
}

export const MarkerStore = create<MarkerStore>((set) => ({
  markers: [],
  setMarkers: (list: Marker[]) => set({ markers: list }),
  addressList: [],
  setStarAddressList: (list: Address[]) => set({ addressList: list }),
}));