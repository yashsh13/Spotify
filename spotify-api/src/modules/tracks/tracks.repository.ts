import { redisClient } from "../../config/cache/redis.js";
import prismaClient from "../../config/database/prismaClient.js";
import type { TrackType, UploadTrackType } from "./tracks.schema.js";
import { getTrackKey, getUrlKey, getAllTracksKey, getUserPlayCountKey } from "../../helper/getKeys.js";

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

export const getTotalTracksCount = async () => {
    return await prismaClient.track.count();
}

export const getTodaysListeningHistory = async(userId: string) => {
    const currentTime = new Date();
    const todayStart = new Date(currentTime.setHours(0,0,0));
    return await prismaClient.listeningHistory.findMany({
        where: {
            userId,
            playedAt: {
                gte: todayStart
            }
        }
    })
}

export const createListeningHistoryEntry = async(userId: string, trackId: string) => {
    return await prismaClient.listeningHistory.create({
        data: {
            userId,
            trackId
        }
    });
}

export const findTracksByGenre = async (genre: string) => {
    return await prismaClient.track.findMany({
        where: {
            genre
        }
    });
}

export const findMostPlayedTrackIds = async (topCount: number) => {
    return await prismaClient.listeningHistory.groupBy({
        by: ['trackId'],
        _count: { trackId: true },
        orderBy: {
            _count: {
                trackId: 'desc'
            }
        },
        take: topCount
    })
}

export const getManyTracksUsingIds = async(trackIds: string[]) => {
    return prismaClient.track.findMany({
        where: {
            id: { in: trackIds }
        }
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

export const setUserPlayCount = async (userId: string, count: string) => {
    const currentTimeInMs = Date.now();
    const midnightInMs = new Date (new Date().setHours(24,0,0,0)).getTime();
    const secondsUntilMidnight = Math.floor((midnightInMs - currentTimeInMs)/1000);

    return await redisClient.set(getUserPlayCountKey(userId), count, {
        expiration: {
            type: "EX",
            value: secondsUntilMidnight
        }
    })
}

export const getUserPlayCount = async (userId: string) => {
    return await redisClient.get(getUserPlayCountKey(userId));
}

export const incrUserPlayCount = async (userId: string) => {
    return await redisClient.incr(getUserPlayCountKey(userId));
}