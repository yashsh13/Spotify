import type { Request, Response } from "express";
import type { PreSignedUrlType, UploadTrackType, GetTrackInfoType, GetAllTracksType, GetTracksByGenreParamsType, GetTracksByGenreQueryType, MostPlayedType, UpdateTrackType } from "./tracks.schema.js";
import * as svc from "./tracks.service.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import parsedEnv from "../../config/env.js";

export const presignedUrlController = async (req: Request, res: Response) => {
    const { audioType, imageType }: PreSignedUrlType = req.validated.body;

    const audioInfo = await svc.putPreSignedUrl(audioType, parsedEnv.S3_TRACK_AUDIO_PREFIX);
    const imageInfo = await svc.putPreSignedUrl(imageType, parsedEnv.S3_TRACK_IMAGE_PREFIX);

    sendSuccess(res, "Created put presigned urls successfully", 200, { audioInfo, imageInfo })
}

export const uploadTrackController = async (req: Request, res: Response) => {
    const trackData: UploadTrackType = req.validated.body;
    const track = await svc.uploadTrack(trackData);
    sendSuccess(res, "Track uploaded successfully", 201, track);
}

export const getTrackInfoController = async (req: Request, res: Response) => {
    const { trackId }: GetTrackInfoType = req.validated.params;
    const { id: userId, plan: userPlan } = req.user;

    const track = await svc.getTrackInfo(trackId, userPlan, userId);
    const coverImageUrl = await svc.getPreSignedUrl(track.coverPhoto);
    const audioUrl = await svc.getPreSignedUrl(track.audioFile);
    sendSuccess(res, "Track fetched successfully", 200, { ...track, coverImageUrl, audioUrl });
}

export const getAllTracksController = async (req: Request, res: Response) => {
    const { pageNo }: GetAllTracksType = req.validated.params;
    const {tracksWithImage: tracks, totalTracksCount: count} = await svc.getAllTracks(pageNo);
    sendSuccess(res, "Fetched all tracks successfully", 200, { tracks, pageNo , count});
}

export const getTracksByGenreController = async (req: Request, res: Response) => {
    const { genre }: GetTracksByGenreParamsType = req.validated.params;
    const { pageNo }: GetTracksByGenreQueryType = req.validated.query;
    const { tracksWithImage: tracks, genreTracksCount: count} = await svc.getTracksByGenre(genre, pageNo);
    sendSuccess(res, "Fetched tracks by genre successfully", 200, { tracks, count } );
}

export const getMostPlayedTracksController = async (req: Request, res: Response) => {
    const { topCount }: MostPlayedType = req.validated.params;
    const tracks = await svc.getMostPlayedTracks(topCount);
    sendSuccess(res, "Fetched most played tracks successfully", 200, tracks);
}

export const updateTrackController = async (req: Request, res: Response) => {
    const updatedValues: UpdateTrackType = req.validated.body;
    const { trackId }: { trackId: string } = req.validated.params;
    const track = await svc.updateTrack(trackId, updatedValues);
    sendSuccess(res, "Track updated successfully", 200, track);
}