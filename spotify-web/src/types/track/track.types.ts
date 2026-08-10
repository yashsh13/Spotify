import { z } from "zod";
import { genres } from "@/src/lib/constants";

export type TrackType = {
    id: string,
    name: string,
    artistName: string,
    coverPhoto?: string,
    duration: number,
    genre: ["hip-hop","classical"],
    createdAt: string,
    audioFile?: string,
    coverImageUrl?: string,
    audioUrl?: string
}

export type CreateTrackType = {
    name: string,
    artistName: string,
    coverPhoto: string,
    duration: number,
    genre: string,
    audioFile: string
}

export const uploadTrackSchema = z.object({
        name: z.string().min(3).max(30).trim(),
        artistName: z.string().min(3).max(30).trim(),
        genre: z.enum(genres.map((genre) => genre.value)),
        image: z.union([
                    z.instanceof(File, {message: "Image is required"})
                    .refine(file => !file || file.size !== 0 || file.size <= 5000000, {message:"Max size exceeded"})
                ])
                .refine(value => value instanceof File || typeof value === "string", {
                    message: "Image is required"
                }),
        audio: z.union([
                    z.instanceof(File, {message: "Audio is required"})
                    .refine(file => !file || file.size !== 0 || file.size <= 5000000, {message:"Max size exceeded"})
                ])
                .refine(value => value instanceof File || typeof value === "string", {
                    message: "Audio is required"
                })
});

export type UploadTrackType = z.infer<typeof uploadTrackSchema>;