'use client'

import TrackStrip from "@/src/components/tracks/TrackStrip";
import { getAllTracksQuery, getMostPlayedTracksQuery, getTracksByGenreQuery } from "@/src/services/tracks/tracks.query";
import StripSkeleton from "@/src/components/skeleton/StripSkeleton";
import useModalStore from "@/src/stores/modalStore";
import PlayerModal from "../player/PlayerModal";

const DashboardBody = () => {
    const { isPending: isAllTracksPending, data: allTracksData } = getAllTracksQuery("1");
    const { isPending: isMostPlayedPending, data: mostPlayedData } = getMostPlayedTracksQuery("6");
    const { isPending: isHindiTracksPending, data: hindiTracksData } = getTracksByGenreQuery("hindi","1");
    const { isPending: isEnglishTracksPending, data: englishTracksData } = getTracksByGenreQuery("english","1");
    const isModalOpen = useModalStore((state) => state.modalOpen);

    return (
        <>
            {isModalOpen && <PlayerModal />}
            <h1 className="text-6xl font-bold px-15 my-10">Welcome, yashsh13</h1>

            {isAllTracksPending && 
            <StripSkeleton title="All Tracks"/>}
            {!isAllTracksPending && 
            <div>
                <TrackStrip title="All Tracks" allTracks={allTracksData?.data.data.tracks}/>
            </div>}
            {isMostPlayedPending && 
            <StripSkeleton title="Most Played Tracks"/>}
            {!isMostPlayedPending && 
            <div>
                <TrackStrip title="Most Played Tracks" allTracks={mostPlayedData?.data.data}/>
            </div>}
            {isHindiTracksPending && 
            <StripSkeleton title="Hindi Tracks"/>}
            {!isHindiTracksPending && 
            <div>
                <TrackStrip title="Hindi Tracks" allTracks={hindiTracksData?.data.data.tracks}/>
            </div>}
            {isEnglishTracksPending && 
            <StripSkeleton title="English Tracks"/>}
            {!isEnglishTracksPending && 
            <div>
                <TrackStrip title="English Tracks" allTracks={englishTracksData?.data.data.tracks}/>
            </div>}
        </>
    )
}

export default DashboardBody;