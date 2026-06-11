import type { Request, Response, NextFunction } from "express";
import { type ZodObject, z } from "zod";
import { ValidationError } from "../utils/apiError.js";

const validationMiddleware = (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {

    const parsedBody = schema.safeParse(req.body);

    if(!parsedBody.success){
        return next(new ValidationError("Zod Validation Failed",z.treeifyError(parsedBody.error)));
    }
    req.body = parsedBody.data;
    return next();
}

export default validationMiddleware;
