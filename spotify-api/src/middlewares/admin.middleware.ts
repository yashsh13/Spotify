import type { Request, Response, NextFunction } from "express"
import { ForbiddenError } from "../utils/apiError.js";

const adminMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const role = req.user.role;
    if(role !== "ADMIN") return next(new ForbiddenError("Only Admin authorized"));
    return next();
}

export default adminMiddleware;