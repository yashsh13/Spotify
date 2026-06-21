import { GetObjectCommand, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import parsedEnv from "../config/env.js";
import s3Client from "../config/aws-s3/s3Client.js";
import { NotFoundError } from "../utils/apiError.js";

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

export const fileExists = async (key: string) => {
    try {
        const command = new HeadObjectCommand({
            Bucket: parsedEnv.AWS_BUCKET,
            Key: key
        });

        const response = await s3Client.send(command);

        return response
    }catch (error){
        console.log("S3 HeadObject Error:", error);
        throw new NotFoundError("File")
    }
}