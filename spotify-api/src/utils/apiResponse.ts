import type { Response } from "express";

export type ResponseDataType = Record<string,unknown> | Record<string,unknown>[];

export const sendSuccess = (res: Response, message: string, statusCode: number = 200, data?: ResponseDataType ) => {
    return res.status(statusCode).json({
        success: true,
        message,
        ...(data && { data })
    })
}

export const sendError = (res: Response, message: string, statusCode: number = 500, errors?: ResponseDataType) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors && {errors})
    })
}