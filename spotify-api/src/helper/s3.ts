import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import parsedEnv from "../config/env.js";
import s3Client from "../config/aws-s3/s3Client.js";

export const getObjectUrl = async (key: string) => {
    const command = new GetObjectCommand({
        Bucket: parsedEnv.AWS_BUCKET,
        Key: key
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 60*60
    })

    return signedUrl;
}

export const putObjectUrl = async (key: string, contentType: string) => {
    const command = new PutObjectCommand({
        Bucket: parsedEnv.AWS_BUCKET,
        Key: key,
        ContentType: contentType
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 60*15
    });

    return signedUrl;
}