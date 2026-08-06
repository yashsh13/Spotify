import Image from 'next/image';
import useModalStore from '@/src/stores/modalStore';
import { getTrackByIdQuery } from '@/src/services/tracks/tracks.query';
import useTrackStore from '@/src/stores/trackStore';

export interface TrackCardProps {
  id: string,
  image: string,
  trackName: string,
  artists: string
}

const TrackCard = ({ id, image, trackName, artists }: TrackCardProps) => {
  const setModalState = useModalStore((state) => state.setModalOpen);
  const setTrack = useTrackStore((state) => state.setTrack);
  const { data, refetch, isFetching } = getTrackByIdQuery(id);

  const playTrack = async () => {
      const { data: freshData } = await refetch();
      console.log(freshData?.data.data);
      setTrack(freshData?.data.data);

      const audio = new Audio(freshData?.data.data.audioUrl);
      audio.play();
      setModalState(true);
    }

  return (
    <div className='transition delay-50 duration-300 hover:scale-105 cursor-pointer' onClick={playTrack}>
        <Image
        src={image}
        width={180}
        height={180}
        alt="Picture of the author"
        className='rounded-md'
        />
        <p className='mt-3 text-md max-w-45'>{trackName}</p>
        <p className='text-sm text-gray-500 max-w-45'>{artists}</p>
    </div>
  )
}

export default TrackCard;
