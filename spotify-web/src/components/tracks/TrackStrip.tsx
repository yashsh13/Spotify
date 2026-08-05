import TrackCard from "./TrackCard";
import { TrackType } from "@/src/types/track/track.types";

export interface TrackStripProps{
    title: string,
    allTracks: TrackType[]
}

const TrackStrip = ({ title ,allTracks}: TrackStripProps) => {
    return (
        <div className="px-20">
            <h1 className="underline cursor-pointer text-lg">{title} -&gt;</h1>
            <div className="flex flex-wrap gap-10 mt-7">
                {allTracks.map((track: TrackType) => {
                    return <TrackCard key={track.id} trackName={track.name} artists={track.artistName} image={track.coverImageUrl} />
                })}
            </div>
        </div>
    )
}

export default TrackStrip;