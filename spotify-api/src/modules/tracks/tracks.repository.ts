import { redisClient } from "../../config/cache/redis.js";
import prismaClient from "../../config/database/prismaClient.js";
import type { TrackType, UploadTrackType } from "./tracks.schema.js";
import { getTrackKey, getUrlKey, getAllTracksKey } from "../../helper/getKeys.js";

export const findTrackById = async (id: string) => {
    return await prismaClient.track.findUnique({
        where: {
            id
        }
    });
}

export const findTrackByName = async (name: string) => {
    return await prismaClient.track.findUnique({
        where: {
            name
        }
    });
}

export const findTrackByAudioKey = async (audioFile: string) => {
    return await prismaClient.track.findUnique({
        where: {
            audioFile
        }
    });
}

export const createTrack = async (trackData: UploadTrackType) => {
    return await prismaClient.track.create({
        data: trackData
    });
}

export const getAllTracks = async (pageNo: number) => {
    return await prismaClient.track.findMany({
        skip: (pageNo-1)*10,
        take: 10
    });
}

export const setTrackInCache = async (trackId: string, trackData: TrackType) => {
    return await redisClient.set(getTrackKey(trackId), JSON.stringify(trackData), {
        expiration: {
            type: "EX",
            value: 60*60
        }
    });
}

export const getTrackFromCache = async (trackId: string) => {
    return await redisClient.get(getTrackKey(trackId));
}

export const setUrlInCache = async (fileKey: string, url: string) => {
    return await redisClient.set(getUrlKey(fileKey), url, {
        expiration: {
            type: "EX",
            value: 60*60
        }
    });
}

export const getUrlFromCache = async (fileKey: string) => {
    return await redisClient.get(getUrlKey(fileKey));
}

export const setAllTracksInCache = async (pageNo: number, tracks: TrackType[]) => {
    return await redisClient.set(getAllTracksKey(pageNo), JSON.stringify(tracks), {
        expiration: {
            type: "EX",
            value: 60*60
        }
    });
}

export const getAllTracksFromCache = async (pageNo: number) => {
    return await redisClient.get(getAllTracksKey(pageNo));
}