import { create } from "zustand";

export interface PlayerStateType {
    audioElement?: HTMLAudioElement,
    setAudioElement: (audioElement: HTMLAudioElement) => void,
    isPlaying: boolean,
    setIsPlaying: (value: boolean) => void,
    currentPlayTime: number,
    setCurrentPlayTime: (value: number) => void
}

const usePlayerStore = create<PlayerStateType>()((set) => ({
    setAudioElement: (audioElement: HTMLAudioElement) => set({audioElement}),
    isPlaying: false,
    setIsPlaying: (value: boolean) => (set({ isPlaying: value})),
    currentPlayTime: 0,
    setCurrentPlayTime: (time: number) => set({ currentPlayTime: time})
}));

export default usePlayerStore;