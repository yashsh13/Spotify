import { TrackType } from "@/src/types/track/track.types";
import { create } from "zustand";

export type TrackState = {
    id?: string,
    name?: string,
    artistName?: string,
    coverPhoto?: string,
    duration?: number,
    genre?: ["hip-hop","classical"],
    createdAt?: string,
    coverImageUrl?: string,
    audioUrl?: string,
    setTrack: (track: TrackType) => void
}

const useTrackStore = create<TrackState>()((set) => ({
    setTrack: (track: TrackType) => set(track)
}))

export default useTrackStore;

