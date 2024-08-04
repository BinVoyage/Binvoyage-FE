import { create } from 'zustand'

interface store {
  filterMode : number;
  setFilterMode : (mode : number) => void;
}
export const useStore = create<store>((set)=>({
  filterMode: -1,
  setFilterMode: (mode: number) => set(() => ({ filterMode: mode })),
}))
