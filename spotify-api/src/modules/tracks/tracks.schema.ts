import { string, z } from 'zod';
import { audioExtensionMap, imageExtensionMap } from '../../helper/constants.js';
import parsedEnv from "../../config/env.js";
import { genre } from '../../helper/constants.js';

export const preSignedUrlSchema = z.object({
    body: z.object({
        audioType: z.enum(Object.keys(audioExtensionMap)),
        imageType: z.enum(Object.keys(imageExtensionMap))
    })
});

export const uploadTrackSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(30).trim(),
        artistName: z.string().min(3).max(30).trim(),
        coverPhoto: z.string().startsWith(parsedEnv.S3_TRACK_IMAGE_PREFIX).trim(),
        duration: z.number().gte(1),
        genre: z.enum(genre).nullable(),
        audioFile: z.string().startsWith(parsedEnv.S3_TRACK_AUDIO_PREFIX).trim()
    })
});

export const trackSchema = z.object({
    id: z.uuid(),
    name: z.string().min(3).max(30).trim(),
    artistName: z.string().min(3).max(30).trim(),
    coverPhoto: z.string().startsWith(parsedEnv.S3_TRACK_IMAGE_PREFIX).trim(),
    duration: z.number().gte(1),
    genre: z.string().nullable(),
    audioFile: z.string().startsWith(parsedEnv.S3_TRACK_AUDIO_PREFIX).trim()
});

export const getTrackInfoSchema = z.object({
    params: z.object({
        trackId: z.uuid()
    })
});

export const getAllTracksSchema = z.object({
    params: z.object({
        pageNo: z.coerce.number().gte(1)
    })
});

export const getTracksByGenreSchema = z.object({
    params: z.object({
        genre: z.enum(genre)
    }),
    query: z.object({
        pageNo: z.coerce.number()
    })
})

export const mostPlayedSchema = z.object({
    params: z.object({
        topCount: z.coerce.number().gte(1).lte(50)
    })
})

export const updateTrackSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(30).trim().optional(),
        artistName: z.string().min(3).max(30).trim().optional(),
        coverPhoto: z.string().startsWith(parsedEnv.S3_TRACK_IMAGE_PREFIX).trim().optional(),
        duration: z.number().gte(1).optional(),
        genre: z.enum(genre).optional(),
        audioFile: z.string().startsWith(parsedEnv.S3_TRACK_AUDIO_PREFIX).trim().optional()
    }),
    params: z.object({
        trackId: z.uuid()
    })
})

export type PreSignedUrlType = z.infer<typeof preSignedUrlSchema.shape.body>;
export type TrackType = z.infer<typeof trackSchema>;
export type GetTrackInfoType = z.infer<typeof getTrackInfoSchema.shape.params>;
export type GetAllTracksType = z.infer<typeof getAllTracksSchema.shape.params>;
export type GetTracksByGenreParamsType = z.infer<typeof getTracksByGenreSchema.shape.params>;
export type GetTracksByGenreQueryType = z.infer<typeof getTracksByGenreSchema.shape.query>;
export type MostPlayedType = z.infer<typeof mostPlayedSchema.shape.params>;

export type UploadTrackType = {
    name: string,
    artistName: string,
    coverPhoto: string,
    duration: number,
    genre?: string,
    audioFile: string 
}

export type UpdateTrackType = {
    name?: string,
    artistName?: string,
    coverPhoto?: string,
    duration?: number,
    genre?: string,
    audioFile?: string 
}
