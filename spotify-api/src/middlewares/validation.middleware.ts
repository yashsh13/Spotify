import type { Request, Response, NextFunction } from "express";
import { type ZodObject, z } from "zod";
import { ValidationError } from "../utils/apiError.js";

const validationMiddleware = (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    
    const parsedRequest = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query
    });
    
    if(!parsedRequest.success){
        return next(new ValidationError("Zod Validation Failed",z.treeifyError(parsedRequest.error)));
    }

    req.validated = {
        body: parsedRequest.data.body,
        params: parsedRequest.data.params,
        query: parsedRequest.data.query
    }

    return next();
}

export default validationMiddleware;
