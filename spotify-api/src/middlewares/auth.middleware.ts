import type { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "../utils/apiError.js";
import { verifyAccessToken} from "../helper/jwt.js";

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if(!authorization) return next(new UnauthorizedError("Authorization header not found"));
    if(!authorization.startsWith('Bearer ')) return next(new UnauthorizedError("Incorrect authorization header format"));

    const accessToken = authorization.split(' ')[1];
    if(!accessToken) return next(new UnauthorizedError("Invalid Token"));

    const accessTokenPayload = verifyAccessToken(accessToken);
    if(!accessTokenPayload) return next(new UnauthorizedError("Invalid Token"));

    req.user = {
        id: accessTokenPayload.userId,
        role: accessTokenPayload.role
    }

    return next();
}

export default authMiddleware;