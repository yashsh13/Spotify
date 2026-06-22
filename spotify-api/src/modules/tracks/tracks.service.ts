import { putObjectUrl, fileExists, getObjectUrl } from "../../helper/s3.js";
import { v4 as uuidv4 } from "uuid";
import { getExtension } from "../../helper/constants.js";
import { ConflictError, ForbiddenError, NotFoundError } from "../../utils/apiError.js";
import type { UploadTrackType, TrackType } from "./tracks.schema.js";
import * as repo from "./tracks.repository.js";
import { Plan } from "../../generated/prisma/enums.js";
import parsedEnv from "../../config/env.js";

export const putPreSignedUrl = async (type: string, prefix: string) => {
    const uuid = uuidv4();
    const extension = getExtension(type);
    if(!extension) throw new NotFoundError("File extension not found");

    const key = `${prefix}/${uuid}.${extension}`;
    const url = await putObjectUrl(key, type);

    return { url, key }
}

export const getPreSignedUrl = async (fileKey: string) => {
    const urlFromCache = await repo.getUrlFromCache(fileKey);
    if(urlFromCache) return urlFromCache;

    const url = await getObjectUrl(fileKey);
    if(!url) throw new NotFoundError("File");
    await repo.setUrlInCache(fileKey, url);
    
    return url
}

export const uploadTrack = async (trackData: UploadTrackType) => {

    const [nameAlreadyExists, audioKeyAlreadyExists] = await Promise.all([
        await repo.findTrackByName(trackData.name),
        await repo.findTrackByAudioKey(trackData.audioFile)
    ])

    if(nameAlreadyExists) throw new ConflictError("Track with this name already exists");
    if(audioKeyAlreadyExists) throw new ConflictError("Track with this audio key already exists");

    //Throws error automatically if files dont exists
    await fileExists(trackData.audioFile);
    await fileExists(trackData.coverPhoto);

    const track = await repo.createTrack(trackData);
    return track;
}

export const getTrackInfo = async (trackId: string, userPlan: Plan, userId: string) => {
    if(userPlan === "FREE"){
        let count = await repo.getUserPlayCount(userId);
        if(!count){
            const history = await repo.getTodaysListeningHistory(userId);
            count = history.length.toString();
            await repo.setUserPlayCount(userId, count);
        }
        if(Number(count) >= parsedEnv.FREE_PLAN_LISTENING_LIMIT) throw new ForbiddenError("Free plan limit reached");

        await repo.incrUserPlayCount(userId);
    }
    
    await repo.createListeningHistoryEntry(userId, trackId);

    const trackFromCache = await repo.getTrackFromCache(trackId);
    if(trackFromCache) return JSON.parse(trackFromCache);

    const track = await repo.findTrackById(trackId);
    if(!track) throw new NotFoundError("Track");

    await repo.setTrackInCache(trackId,track);
    return track
}

export const getAllTracks = async (pageNo: number) => {

    const tracksFromCache = await repo.getAllTracksFromCache(pageNo);
    let tracks: TrackType[]
    
    if(!tracksFromCache) {
        tracks = await repo.getAllTracks(pageNo);
        if(!tracks) throw new NotFoundError("Tracks");
        await repo.setAllTracksInCache(pageNo, tracks);
    } else {
        tracks = JSON.parse(tracksFromCache);
    }
    
    const tracksWithImage = Promise.all(await tracks.map(async (track: TrackType) => {
        const coverImageUrl = await getPreSignedUrl(track.coverPhoto);
        return { ...track, coverImageUrl}
    }));

    return tracksWithImage;
}

export const getTracksByGenre = async (genre: string) => {
    const tracks = await repo.findTracksByGenre(genre);
    if(!tracks) throw new NotFoundError("Tracks with this genre");

    const tracksWithImage = Promise.all(await tracks.map(async (track: TrackType) => {
        const coverImageUrl = await getPreSignedUrl(track.coverPhoto);
        return { ...track, coverImageUrl}
    }));

    return tracksWithImage;
}
