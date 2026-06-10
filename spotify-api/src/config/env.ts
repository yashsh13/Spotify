import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const envSchema = z.object({
    PORT: z.coerce.number(),
    NODE_ENV: z.enum(["development","production"]),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    BCRYPT_SALT_ROUNDS: z.coerce.number(),
    RESEND_API_KEY: z.string(),
    EMAIL_FROM: z.string()
});

export type EnvType = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success){
    throw new Error(JSON.stringify(parsedEnv.error.issues, null, 2));
};

export default parsedEnv.data;

