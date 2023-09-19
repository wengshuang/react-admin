import { create } from "zustand";
import { persist } from "zustand/middleware";
const useStore = create(
  persist(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: "bears-storage", // unique name
    }
  )
);

export default useStore;
