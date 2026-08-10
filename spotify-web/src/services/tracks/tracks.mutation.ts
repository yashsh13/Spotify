import { useMutation } from "@tanstack/react-query";
import * as apiCall from "./tracks.api";
import { CreateTrackType } from "@/src/types/track/track.types";
import { GetPresignedUrlType, PutFileInS3Type } from "@/src/types/track/filesInS3.types";
import useFileStore from "@/src/stores/fileStore";
import { apiErrorDisplay, apiSuccessDisplay } from "@/src/utils/apiResponseDisplay";

export const useGetPresignedUrls = () => {
    return useMutation({
        mutationFn: (body: GetPresignedUrlType) => apiCall.getPresignedUrls(body),
        onSuccess: (response) => {
            const data = response.data.data;
            useFileStore.getState().setFileStore(data.imageInfo.url, data.imageInfo.key, data.audioInfo.url, data.audioInfo.key);
        },
        onError: (error) => console.log(error)
    })
}

export const usePutFileinS3 = () => {
    return useMutation({
        mutationFn: ({url, file, contentType}: PutFileInS3Type) => apiCall.putFileinS3(url, file, contentType),
        onSuccess: (response) => console.log(response),
        onError: (error) => console.log(error) 
    })
}

export const useUploadTrack = () => {
    return useMutation({
        mutationFn: (body: CreateTrackType) => apiCall.uploadTrack(body),
        onSuccess: (response) => apiSuccessDisplay(response),
        onError: (error) => apiErrorDisplay(error)
    })
}