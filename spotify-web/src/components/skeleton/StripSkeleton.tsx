import { Skeleton } from "@/src/components/ui/skeleton";
import SkeletonCard from "./CardSkeleton";

const StripSkeleton = ({ title }: {title: string}) => {
    return(
        <div className="px-20">
            <h1 className="underline cursor-pointer text-lg">{title} -&gt;</h1>
            <div className="flex flex-wrap gap-10 mt-7">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    )
}

export default StripSkeleton;