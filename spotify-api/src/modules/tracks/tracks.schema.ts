import { z } from 'zod';
import { audioExtensionMap, imageExtensionMap } from '../../helper/getExtension.js';

export const preSignedUrlSchema = z.object({
    audioType: z.enum(Object.keys(audioExtensionMap)),
    imageType: z.enum(Object.keys(imageExtensionMap))
})

export type PreSignedUrlType = z.infer<typeof preSignedUrlSchema>;