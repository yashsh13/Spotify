import { z } from 'zod';
import { audioExtensionMap, imageExtensionMap } from '../../helper/getExtension.js';

export const preSignedUrlSchema = z.object({
    audioType: z.enum(Object.keys(audioExtensionMap)),
    imageType: z.enum(Object.keys(imageExtensionMap))
});

export const uploadTrackSchema = z.object({
    name: z.string().min(3).max(30).trim(),
    artistName: z.string().min(3).max(30).trim(),
    coverPhoto: z.string().trim(),
    duration: z.number().gte(1),
    genre: z.enum(["hip-hop","classical"]).nullable(),
    audioFile: z.string().trim()
});

export const trackSchema = z.object({
    id: z.uuid(),
    name: z.string().min(3).max(30).trim(),
    artistName: z.string().min(3).max(30).trim(),
    coverPhoto: z.string().trim(),
    duration: z.number().gte(1),
    genre: z.string().nullable(),
    audioFile: z.string().trim()
});

export const getTrackInfoSchema = z.object({
    trackId: z.uuid()
});

export const getAllTracksSchema = z.object({
    pageNo: z.number().gte(1)
});

export type PreSignedUrlType = z.infer<typeof preSignedUrlSchema>;
export type UploadTrackType = z.infer<typeof uploadTrackSchema>;
export type TrackType = z.infer<typeof trackSchema>;
export type GetTrackInfoType = z.infer<typeof getTrackInfoSchema>;
export type GetAllTracksType = z.infer<typeof getAllTracksSchema>;