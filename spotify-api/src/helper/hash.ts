import bcrypt from "bcryptjs";
import parsedEnv from "../config/env.js";
import crypto from "crypto";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password,parsedEnv.BCRYPT_SALT_ROUNDS);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

export const hashToken = (token: string) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}