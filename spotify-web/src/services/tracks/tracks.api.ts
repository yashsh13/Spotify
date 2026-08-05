import api from "@/src/utils/api"

export const getAllTracks = (pageNo: string) => {
    return api.get(`/api/v1/tracks/all/${pageNo}`);
}