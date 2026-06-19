import type { Request, Response } from "express";
import type { PreSignedUrlType } from "./tracks.schema.js";
import * as svc from "./tracks.service.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import parsedEnv from "../../config/env.js";

export const presignedUrlController = async (req: Request, res: Response) => {
    const { audioType, imageType }: PreSignedUrlType = req.body;

    const audioInfo = await svc.putPreSignedUrl(audioType, parsedEnv.S3_TRACK_AUDIO_PREFIX);
    const imageInfo = await svc.putPreSignedUrl(imageType, parsedEnv.S3_TRACK_IMAGE_PREFIX);

    sendSuccess(res, "Created put presigned urls successfully", 200, { audioInfo, imageInfo })
}