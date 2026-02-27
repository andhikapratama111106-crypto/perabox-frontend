import { create } from 'zustand';

interface UIState {
    isFinishedPreloading: boolean;
    finishPreloading: () => void;
    resetPreloading: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isFinishedPreloading: false,
    finishPreloading: () => set({ isFinishedPreloading: true }),
    resetPreloading: () => set({ isFinishedPreloading: false }),
}));
