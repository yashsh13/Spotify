import { Role } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import parsedEnv from "../config/env.js";

export interface AuthTokenPayload {
    userId: string,
    role: Role
}

export interface ForgotPassTokenPayload {
    userId: string
}

export const createTokens = (userId: string, role: Role) => {
    const jwtPayLoad: AuthTokenPayload = {
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
        return jwt.verify(accessToken, parsedEnv.ACCESS_TOKEN_SECRET) as AuthTokenPayload;
    } catch {
        return null
    }
}

export const verifyRefreshToken = (refreshToken: string) => {
    try{
        return jwt.verify(refreshToken, parsedEnv.REFRESH_TOKEN_SECRET) as AuthTokenPayload;
    } catch {
        return null
    }
}

export const createForgotPasswordToken = (userId: string) => {
    const forgotPassPayload: ForgotPassTokenPayload = { userId };
    const token = jwt.sign(forgotPassPayload, parsedEnv.FORGOT_PASSWORD_SECRET,{
        expiresIn: '10m'
    });

    return token;
}

export const verifyForgotPasswordToken = (forgotPasswordToken: string) => {
    try{
        return jwt.verify(forgotPasswordToken, parsedEnv.FORGOT_PASSWORD_SECRET) as ForgotPassTokenPayload;
    } catch{
        return null
    }
}
