import type { Request, Response, NextFunction} from "express";

export type asyncFun = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

const asyncHandler = (fun: asyncFun): ((req: Request, res: Response, next: NextFunction) => void) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req,res,next)).catch(next);
};

export default asyncHandler;