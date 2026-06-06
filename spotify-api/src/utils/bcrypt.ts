import bcrypt from "bcryptjs";
import parsedEnv from "../config/env.js";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password,parsedEnv.BCRYPT_SALT_ROUNDS);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}