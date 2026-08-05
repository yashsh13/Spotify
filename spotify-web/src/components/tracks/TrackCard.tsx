import Image from 'next/image';

export interface TrackCardProps {
  image: string,
  trackName: string,
  artists: string
}

const TrackCard = ({ image, trackName, artists }: TrackCardProps) => {
  return (
    <div className='transition delay-50 duration-300 hover:scale-105 cursor-pointer'>
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
