import { create } from 'zustand';

interface UIState {
    isFinishedPreloading: boolean;
    finishPreloading: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isFinishedPreloading: false,
    finishPreloading: () => set({ isFinishedPreloading: true }),
}));
