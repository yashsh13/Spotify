import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/apiError.js";
import { sendError } from "../utils/apiResponse.js";

const errorMiddleware = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if(err instanceof AppError){
        return sendError(res, err.message, err.statusCode, err.errors);
    }

    console.log(err);
    return sendError(res, "Internal Server Error");
}

export default errorMiddleware;