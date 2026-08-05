'use client'

import TrackStrip from "@/src/components/tracks/TrackStrip";
import { getAllTracksQuery } from "@/src/services/tracks/tracks.query";
import StripSkeleton from "@/src/components/skeleton/StripSkeleton";

const DashboardBody = () => {
    const { isPending, error, data: allTracksData } = getAllTracksQuery("1");

    return (
        <>
            <h1 className="text-6xl font-bold px-15 my-10">Welcome, yashsh13</h1>
            {isPending && <StripSkeleton title="All Tracks"/>}
            {!isPending && <div>
                <TrackStrip title="All Tracks" allTracks={allTracksData?.data.data.tracks}/>
            </div>}
        </>
    )
}

export default DashboardBody;