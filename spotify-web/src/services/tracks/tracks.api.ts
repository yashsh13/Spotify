import api from "@/src/utils/api";
import { CreateTrackType } from "@/src/types/track/track.types";
import { GetPresignedUrlType } from "@/src/types/track/filesInS3.types";
import axios from "axios";

export const getAllTracks = (pageNo: string) => {
    return api.get(`/api/v1/tracks/all/${pageNo}`);
}

export const getTrackById = (id: string) => {
    return api.get(`/api/v1/tracks/listen/${id}`);
}

export const getPresignedUrls = (body: GetPresignedUrlType) => {
    return api.post(`/api/v1/tracks/presignedurl/put`,
        body
    );
}

export const putFileinS3 = (url: string, file: File, contentType: string) => {
    return axios.put(url,
        file,
        {headers: {
            "Content-Type": contentType
        }}
    );
}

export const uploadTrack = (body: CreateTrackType) => {
    return api.post('/api/v1/tracks/upload',
        body
    );
} 