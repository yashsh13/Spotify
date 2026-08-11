import TrackCard from "./TrackCard";
import { TrackType } from "@/src/types/track/track.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel"

export interface TrackStripProps{
    title: string,
    allTracks: TrackType[]
}

const TrackStrip = ({ title ,allTracks}: TrackStripProps) => {
    return (
    <Carousel
        opts={{
            align: "start",
        }}
        className="w-350 px-3 ml-15"
        >
        <h1 className="underline cursor-pointer text-lg my-5">{title} -&gt;</h1>
        <CarouselContent>
            {allTracks.map((track: TrackType, index) => (
            <CarouselItem key={index} className="basis-1/6">
                <div className="p-1">
                <TrackCard key={track.id} id ={track.id} trackName={track.name} artists={track.artistName} image={track.coverImageUrl!} />
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
    )
}

export default TrackStrip;