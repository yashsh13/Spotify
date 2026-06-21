import prismaClient from "../../config/database/prismaClient.js";
import { redisClient } from "../../config/cache/redis.js";
import { getOTPKey, getRefreshTokenKey, getForgotPassTokenKey } from "../../helper/getKeys.js";

export const findUserByEmail = async (email: string) => {
    return await prismaClient.user.findUnique({
        where: {
            email
        }
    });
}

export const findUserByUsername = async (username: string) => {
    return await prismaClient.user.findUnique({
        where: {
            username
        }
    });
}

export const findUserById = async (userId: string) => {
    return await prismaClient.user.findUnique({
        where: {
            id: userId
        }
    });
}

export const createUser = async (username: string, email: string, password: string) => {
    return await prismaClient.user.create({
        data: {
            username,
            email,
            password
        },
        select: {
            id: true,
            email: true,
            username: true,
            isVerified: true,
            role: true,
            createdAt: true
        }
    });
}

export const updateUserById = async (id: string, updatedValues: {
    email?: string,
    username?: string
    password?: string,
    isVerified?: boolean,
    avatar?: string
}) => {
    return await prismaClient.user.update({
        where: {
            id
        },
        data: updatedValues,
        select: {
            id: true,
            email: true,
            username: true,
            isVerified: true,
            role: true,
            plan: true,
            createdAt: true
        }
    });
}

export const updateUserByUsername = async (username: string, updatedValues: {
    email?: string,
    password?: string,
    isVerified?: boolean,
    avatar?: string
}) => {
    return await prismaClient.user.update({
        where: {
            username
        },
        data: updatedValues,
        select: {
            id: true,
            email: true,
            username: true,
            isVerified: true,
            role: true,
            plan: true,
            createdAt: true
        }
    });
}

export const updateUserByEmail = async (email: string, updatedValues: {
    username?: string,
    password?: string,
    isVerified?: boolean,
    avatar?: string
}) => {
    return await prismaClient.user.update({
        where: {
            email
        },
        data: updatedValues,
        select: {
            id: true,
            email: true,
            username: true,
            isVerified: true,
            role: true,
            plan: true,
            createdAt: true
        }
    });
}

export const saveOTPInCache = async (email: string, otp: string) => {
    return await redisClient.set(getOTPKey(email), otp, {
        expiration: {
            type: "EX",
            value: 600
        }
    });
}

export const deleteOTPFromCache = async (email: string) => {
    return await redisClient.del(getOTPKey(email));
}

export const getOTPFromCache = async (email: string) => {
    return await redisClient.get(getOTPKey(email));
}

export const saveRefreshTokenInCache = async (userId: string, refreshToken: string) => {
    return await redisClient.set(getRefreshTokenKey(userId), refreshToken, {
        expiration: {
            type:"EX",
            value: 60*60*24*30
        }
    });
}

export const getRefreshTokenFromCache = async (userId: string) => {
    return await redisClient.get(getRefreshTokenKey(userId));
}

export const deleteRefreshTokenFromCache = async (userId: string) => {
    return await redisClient.del(getRefreshTokenKey(userId));
}

export const saveForgotPassTokenInCache = async (userId: string, forgotPasswordToken: string) => {
    return await redisClient.set(getForgotPassTokenKey(userId), forgotPasswordToken, {
        expiration: {
            type: "EX",
            value: 300
        }
    });
}

export const getForgotPassTokenFromCache = async (userId: string) => {
    return await redisClient.get(getForgotPassTokenKey(userId));
}

export const deleteForgotPassTokenFromCache = async (userId: string) => {
    return await redisClient.del(getForgotPassTokenKey(userId));
}