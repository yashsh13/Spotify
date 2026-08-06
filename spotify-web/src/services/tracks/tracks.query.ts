import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/src/services/tracks/tracks.query-keys";
import * as apiCall from "@/src/services/tracks/tracks.api";

export const getAllTracksQuery = (pageNo: string) => {
    return useQuery({
        queryKey: queryKeys.all(),
        queryFn: () => apiCall.getAllTracks(pageNo)
    })
}

export const getTrackByIdQuery = (id: string) => {
    return useQuery({
        queryKey: queryKeys.id(id),
        queryFn: () => apiCall.getTrackById(id),
        enabled: false
    })
}