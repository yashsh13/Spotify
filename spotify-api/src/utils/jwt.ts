import { Role } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import parsedEnv from "../config/env.js";

export interface TokenPayload {
    userId: string,
    role: Role
}

export const createTokens = (userId: string, role: Role) => {
    const jwtPayLoad: TokenPayload = {
        userId,
        role
    }

    const accessToken = jwt.sign(jwtPayLoad,parsedEnv.ACCESS_TOKEN_SECRET,{
        expiresIn: '15m'
    });
    const refreshToken = jwt.sign(jwtPayLoad,parsedEnv.REFRESH_TOKEN_SECRET,{
        expiresIn:'30d'
    });

    return { accessToken, refreshToken }
}

export const verifyAccessToken = (accessToken: string) => {
    try{
        return jwt.verify(accessToken, parsedEnv.ACCESS_TOKEN_SECRET);
    } catch {
        return null
    }
}

export const verifyRefreshToken = (refreshToken: string) => {
    try{
        return jwt.verify(refreshToken, parsedEnv.REFRESH_TOKEN_SECRET);
    } catch {
        return null
    }
}

