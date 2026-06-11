import prismaClient from "../../database/prismaClient.js";
import { redisClient } from "../../cache/redis.js";
import { getOTPKey } from "../../helper/getKeys.js";

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