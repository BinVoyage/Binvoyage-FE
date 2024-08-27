import { create } from 'zustand'

interface store {
  filterMode : number;
  setFilterMode : (mode : number) => void;
}
export const mapStore = create<store>((set)=>({
  filterMode: -1,
  setFilterMode: (mode: number) => set(() => ({ filterMode: mode })),
}))
