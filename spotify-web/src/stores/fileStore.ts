import { create } from "zustand";

interface FileStateType {
    imageUrl?: string,
    imageKey?: string,
    audioUrl?: string,
    audioKey?: string,
    setFileStore: (imageUrl: string, imageKey: string, audioUrl: string, audioKey: string) => void
}

const useFileStore = create<FileStateType>()((set) => ({
    setFileStore: (imageUrl: string, imageKey: string, audioUrl: string, audioKey: string) => set({imageUrl,imageKey,audioUrl,audioKey})
}));

export default useFileStore;