import { S3Client } from "@aws-sdk/client-s3";
import parsedEnv from "../env.js";

const globalForS3 = global as unknown as { s3Client: S3Client };

const s3Client = globalForS3.s3Client || 
    new S3Client({ region: parsedEnv.AWS_REGION,
        credentials: {
            secretAccessKey: parsedEnv.AWS_SECRET_ACCESS_KEY,
            accessKeyId: parsedEnv.AWS_ACCESS_KEY_ID
        }
    });

if(parsedEnv.NODE_ENV !== "production") globalForS3.s3Client = s3Client;

export default s3Client;