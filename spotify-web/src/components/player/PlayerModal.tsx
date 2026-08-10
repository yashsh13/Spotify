'use client'
import { Slider } from "@/src/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import useModalStore from "@/src/stores/modalStore";
import useTrackStore from "@/src/stores/trackStore";
import Image from "next/image";
import usePlayerStore from "@/src/stores/playerStore";
import { useEffect, useState } from "react";


const PlayerModal = () => {
    const setModalState = useModalStore((state) => state.setModalOpen);
    const { name, artistName, genre, duration, coverImageUrl } = useTrackStore((state) => state);
    const { audioElement, isPlaying, setIsPlaying, setCurrentPlayTime, currentPlayTime } = usePlayerStore( state => state);
    const [sliderValue, setSliderValue ] = useState(0);

    useEffect(() => {
        if(isPlaying) {
            audioElement?.play();
            return
        }
        audioElement?.pause()
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(isPlaying){
                setCurrentPlayTime(currentPlayTime as number + 1);
                onSliderChange(currentPlayTime);
            }
        }, audioElement?.duration);

     return () => clearInterval(interval)
    }, [currentPlayTime, isPlaying])

    const onSliderChange = (value: number | readonly number[]) => {
        setSliderValue(Array.isArray(value) ? (value[0] ?? 50) : value);
    }

    const onUserSlide = (value: number | readonly number[]) => {
        setCurrentPlayTime(value as number);
        audioElement!.currentTime = (audioElement?.duration as number/1000)*(value as number)
    }
    
    return (
        <div className="fixed z-2 h-screen w-screen">
            <div className="h-6/8 bg-white/90">
                <div className="flex justify-end items-center px-10 border-t">
                    <p className="text-3xl cursor-pointer" onClick={() => setModalState(false)}>&#8964;</p>
                </div>
                <div className="h-full flex">
                    <div className="h-full w-1/2 flex items-center justify-center">
                        <Image
                            src={coverImageUrl as string}
                            width={400}
                            height={400}
                            alt="Picture of the author"
                            className='rounded-md'
                            />
                    </div>
                    <div className="h-full w-1/2 flex flex-col items-start justify-center pl-30">
                        <p className="text-3xl font-bold">{name}</p>
                        <p className="text-lg text-gray-500">{artistName}</p>
                        <p className="text-md text-gray-500">Genre: {genre}</p>
                        <p className="text-md text-gray-500">Duration: {duration}</p>
                    </div>
                </div>
            </div>
            <div className="h-2/8 border bg-white">
                <div className="py-7 px-5">
                    <Slider
                    value={sliderValue}
                    max={1000}
                    step={1}
                    className="mx-auto w-full"
                    onValueChange={onSliderChange}
                    onValueCommitted={onUserSlide}
                    />
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                    <SkipBack size={30} className="cursor-pointer"/>
                    {isPlaying ? 
                    <Pause size={30} className="cursor-pointer" onClick={() => setIsPlaying(false)}/> : 
                    <Play size={30} className="cursor-pointer" onClick={() => setIsPlaying(true)}/> }
                    <SkipForward size={30} className="cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default PlayerModal;