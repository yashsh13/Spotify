import { Router } from "express";
import { preSignedUrlSchema, uploadTrackSchema, getTrackInfoSchema, getAllTracksSchema } from "./tracks.schema.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import * as ctrl from "./tracks.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";

const tracksRouter: Router = Router();

tracksRouter.post('/presignedurl/put', authMiddleware, adminMiddleware, validationMiddleware(preSignedUrlSchema), asyncHandler(ctrl.presignedUrlController));
tracksRouter.post('/upload', authMiddleware, adminMiddleware, validationMiddleware(uploadTrackSchema), asyncHandler(ctrl.uploadTrackController));
tracksRouter.get('/info', authMiddleware, validationMiddleware(getTrackInfoSchema), asyncHandler(ctrl.getTrackInfoController));
tracksRouter.get('/all', authMiddleware, validationMiddleware(getAllTracksSchema), asyncHandler(ctrl.getAllTracksController));

export default tracksRouter;