import { Skeleton } from "@/src/components/ui/skeleton"

const SkeletonCard = () => {
  return (
    <div className="w-55">
        <Skeleton className="aspect-video w-48 h-48" />
        <div className="flex flex-col gap-1 mt-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
        </div>
    </div>
  )
}

export default SkeletonCard;
