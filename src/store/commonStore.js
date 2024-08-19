import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useCommonStore = create(
  devtools((set) => ({
    count: 0,
    setCount: (newCount) => set({ count: newCount })
  }))
);
