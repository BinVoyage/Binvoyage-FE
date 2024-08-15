import { create } from 'zustand'

interface store {
  filterMode : number;
  setFilterMode : (mode : number) => void;
}
export const mapStore = create<store>((set)=>({
  filterMode: 0,
  setFilterMode: (mode: number) => set(() => ({ filterMode: mode })),
}))
